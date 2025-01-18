<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Question;

class DeckController extends Controller
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
        $user_id = Auth::id();

        $decks = Deck::where([
                ['user_id', '=', $user_id],
                ['access', '!=', 'public-rw-listed'],
                ['is_ephemeral', '=', false],
                ['is_archived', '=', false],
            ])
            ->orWhereHas('bookmarks', function ($query) {
                $query->where('user_id', '=', Auth::id())
                    ->where('access', '=', 'public-rw');
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
        abort_if($request->access == "public-rw-listed" && !Auth::user()->is_admin, 403);

        $deck = new Deck();

        $user = Auth::user();

        if ($request->name) {
            $deck->name = $request->name;
        } else {
            $now = date('Y-m-d H:i:s');
            $deck->name = 'New deck created at '. $now;
        }

        $deck->exam_at = $request->exam_at;
        $deck->module_id = $request->module_id;
        $deck->user_id = $user->id;

        $deck->access = $request->input('access', 'private');

        $deck->save();

        // If `$request->question_ids` is set, we create
        // a "super deck" that contains all questions
        if ($request->question_ids) {
            // Attach the questions to the new super deck
            $deck->questions()->attach($request->question_ids);
        }

        return response()->json($deck);
    }

    public function update(Request $request, Deck $deck)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        // You should not be able to change the access level to "public-rw-listed" here
        abort_if($deck->access != "public-rw-listed" && $request->access == "public-rw-listed", 403);

        // Only admins and moderators should be able to edit "public-rw-listed" decks
        abort_if($deck->access == "public-rw-listed" && !Auth::user()->is_admin && !Auth::user()->is_moderator, 403);

        // You should not be able to archive the deck if it was submitted or listed
        $is_submitted_or_listed = ($deck->submission()->exists() || $deck->access == 'public-rw-listed');
        if ($request->is_archived and $is_submitted_or_listed) {
            return response()->json([
                'error' => 'This deck cannot be archived because it was already submitted or listed.',
            ], 400);
        }

        $deck->update($request->all());
        $deck->access = $request->input('access', 'private');

        $deck->save();

        return response()->json($deck);
    }

    public function addQuestionById(Request $request, Deck $deck)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        $question = Question::findOrFail($request->question_id);
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

        $question_id = $request->question_id;
        $deck->questions()->detach($question_id);

        return response()->noContent();
    }
}
