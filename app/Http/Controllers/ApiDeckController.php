<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Question;

class ApiDeckController extends Controller
{
    private const PAGE_SIZE = 50;

    public function index(Request $request)
    {
        // TODO(schu): decide about the request params and what
        // data and how much of it actually should be returned.
        // Should module and subject info be included?
        // Do we need pagination?
        // etc.

        if ($request->module) {
            $decksQuery = Deck::where([
                ['module_id', '=', $request->module],
                ['is_archived', '=', false],
                ['is_ephemeral', '=', false]
            ]);

            if ($request->kind == 'public') {
                $decksQuery = $decksQuery
                    ->where(function ($query) {
                        $query->where('access', '=', 'public-ro')
                            ->orWhere('access', '=', 'public-rw');
                    });
            } elseif ($request->kind == 'user') {
                $decksQuery = $decksQuery
                    ->where('user_id', '=', Auth::id())
                    ->where('access', '!=', 'public-rw-listed');
            } elseif ($request->kind == 'public-rw-listed') {
                $decksQuery = $decksQuery->where('access', '=', 'public-rw-listed');
            } elseif ($request->kind == 'bookmarked') {
                $decksQuery = $decksQuery->whereHas('bookmarks', function ($query) {
                    $query->where('user_id', '=', Auth::id())
                        ->where(function ($query) {
                            $query->where('decks.access', '!=', 'private')
                                ->orWhere('decks.user_id', '=', Auth::id());
                        });
                });
            } else {
                abort(400, 'Invalid value for "kind" parameter');
            }

            $decks = $decksQuery
                ->with('module', 'module.subject', 'questions:id,is_invalid', 'questions.images:id,question_id')
                ->with(['sessions' => function ($query) {
                    $query->where('user_id', '=', Auth::id())->with('answerChoices');
                }])
                ->with(['bookmarks' => function ($query) {
                    $query->select('id', 'user_id')
                        ->where('user_id', '=', Auth::id());
                }])
                ->orderBy('exam_at', 'desc')
                ->orderBy('id', 'desc')
                ->paginate(self::PAGE_SIZE)->withQueryString();

            return response()->json($decks);
        }

        if ($request->decks) {
            // Return the decks with the given IDs; this endpoint
            // is used by the superdeck creation form to get the
            // number of questions and images in each deck
            return response()->json(
                Deck::whereIn('id', $request->decks)
                    ->where(function ($query) {
                        $query->where('access', '!=', 'private')
                            ->orWhere('user_id', '=', Auth::id());
                    })
                    ->with('questions:id', 'questions.images:id,question_id')->get()
            );
        }

        // Return all public decks
        return response()->json(
            Deck::where('access', '=', 'public-rw-listed')
                ->with('module', 'module.subject', 'questions:id')->get()
        );
    }

    public function indexWithQuestionIds(Request $request)
    {
        $user = Auth::user();

        $decks = Deck::personalDecksBy($user)
            ->orWhere(function (Builder $query) use ($user) {
                $query->bookmarkedAndWritableBy($user);
            })
            ->with('questions:id')->get();

        return response()->json($decks);
    }

    public function show($id)
    {
        $deck = Deck::with('cases', 'cases.questions:id,case_id', 'questions.answers', 'questions.images', 'questions.case')->find($id);

        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);

        return response()->json($deck);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:500',
            'exam_at' => 'nullable|date',
            'module_id' => 'nullable|integer|exists:modules,id',
            'access' => 'nullable|string|in:private,public-ro,public-rw,public-rw-listed',
            'question_ids' => 'nullable|array',
            'question_ids.*' => 'integer|exists:questions,id',
        ]);

        abort_if(($validated['access'] ?? null) == "public-rw-listed" && !Auth::user()->is_admin, 403);

        $deck = new Deck();

        $user = Auth::user();

        if (!empty($validated['name'])) {
            $deck->name = $validated['name'];
        } else {
            $now = date('Y-m-d H:i:s');
            $deck->name = 'New deck created at '. $now;
        }

        $deck->exam_at = $validated['exam_at'] ?? null;
        $deck->module_id = $validated['module_id'] ?? null;
        $deck->user_id = $user->id;

        $deck->access = $validated['access'] ?? 'private';

        $deck->save();

        // If question_ids is set, we create a "super deck" that contains all questions
        if (!empty($validated['question_ids'])) {
            $deck->questions()->attach($validated['question_ids']);
        }

        return response()->json($deck);
    }

    public function update(Request $request, Deck $deck)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:500',
            'description' => 'sometimes|nullable|string|max:5000',
            'exam_at' => 'sometimes|nullable|date',
            'module_id' => 'sometimes|nullable|integer|exists:modules,id',
            'access' => 'sometimes|nullable|string|in:private,public-ro,public-rw,public-rw-listed',
            'is_archived' => 'sometimes|boolean',
        ]);

        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        // You should not be able to change the access level to "public-rw-listed" here
        abort_if($deck->access != "public-rw-listed" && ($validated['access'] ?? null) == "public-rw-listed", 403);

        // Only admins and moderators should be able to edit "public-rw-listed" decks
        abort_if($deck->access == "public-rw-listed" && !Auth::user()->is_admin && !Auth::user()->is_moderator, 403);

        // You should not be able to archive the deck if it was submitted or listed
        $is_submitted_or_listed = ($deck->submission()->exists() || $deck->access == 'public-rw-listed');
        if (($validated['is_archived'] ?? false) and $is_submitted_or_listed) {
            return response()->json([
                'error' => 'This deck cannot be archived because it was already submitted or listed.',
            ], 400);
        }

        $deck->update($validated);
        $deck->access = $validated['access'] ?? $deck->access;

        $deck->save();

        return response()->json($deck);
    }

    public function addQuestionById(Request $request, Deck $deck)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        $validated = $request->validate([
            'question_id' => 'required|integer|exists:questions,id',
        ]);

        $question = Question::findOrFail($validated['question_id']);
        $deck->questions()->syncWithoutDetaching($question->id);

        if ($question->case_id) {
            $deck->cases()->syncWithoutDetaching($question->case_id);
        }

        return response()->noContent();
    }

    public function removeQuestionById(Request $request, Deck $deck)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        $validated = $request->validate([
            'question_id' => 'required|integer|exists:questions,id',
        ]);

        $deck->questions()->detach($validated['question_id']);

        return response()->noContent();
    }
}
