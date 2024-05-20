<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;

class DeckController extends Controller
{
    public function index(Request $request)
    {
        // TODO(schu): decide about the request params and what
        // data and how much of it actually should be returned.
        // Should module and subject info be included?
        // Do we need pagination?
        // etc.

        if ($request->module) {
            // Return all public decks for the given module
            return response()->json(
                Deck::where([
                    ['module_id', '=', $request->module],
                    ['access', '=', 'public-rw-listed'],
                ])
                ->with('module', 'module.subject', 'questions:id,is_invalid', 'questions.images:id,question_id')
                ->with(['sessions' => function ($query) {
                    $query->where('user_id', '=', Auth::id());
                }])
                ->with('sessions.answerChoices')
                ->get()
            );
        }
        if ($request->decks) {
            // Return the decks with the given IDs; this endpoint
            // is used by the superdeck creation form to get the
            // number of questions and images in each deck
            return response()->json(
                Deck::whereIn('id', $request->decks)
                    ->where('access', '=', 'public-rw-listed')
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
            ])->with('questions:id')->get();

        return response()->json($decks);
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

        // You should not be able to unlist the deck
        abort_if($deck->access == "public-rw-listed" && $request->access && $request->access != "public-rw-listed", 403);

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

        $question_id = $request->question_id;
        $deck->questions()->attach($question_id);

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
