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
            return response()->json(
                Deck::where('module_id', '=', $request->module)->with('module', 'module.subject', 'questions:id')->get()
            );
        }
        return response()->json(
            Deck::with('module', 'module.subject', 'questions:id')->get()
        );
    }

    public function indexWithQuestionIds(Request $request)
    {
        $user_id = Auth::id();
        $decks = Deck::where([
                ['user_id', '=', $user_id],
                ['access', '!=', 'public-rw-listed'],
                ['is_ephemeral', '=', false],
            ])->with('questions:id')->get();
        return response()->json($decks);
    }

    public function store(Request $request)
    {
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

        if ($request->access) {
            if ($request->access == 'public-rw-listed' && !$user->is_admin) {
                abort(403, 'Unauthorized');
            }
            $deck->access = $request->access;
        }

        $deck->save();

        // If `$request->deck_ids` is set, we create
        // a "super deck" that contains all questions
        // of all decks
        if ($request->deck_ids) {
            // The question IDs to attach to the new super deck
            $question_ids = [];

            foreach ($request->deck_ids as $deck_id) {
                $d = Deck::findOrFail((int)$deck_id);

                // Create an array of question ids
                $questions = $d->questions()->get()->toArray();
                $ids = array_map(
                    function ($q) {
                        return $q['id'];
                    },
                    $questions
                );

                $question_ids = array_merge($question_ids, $ids);
            }

            $question_ids = array_unique($question_ids);

            // Attach the questions to the new super deck
            $deck->questions()->attach($question_ids);
        }

        return response()->json($deck);
    }

    public function update(Request $request, Deck $deck)
    {
        // TODO(schu): check if user owner

        $deck->update($request->all());
        return response()->json($deck);
    }

    public function addQuestionById(Request $request, Deck $deck)
    {
        // TODO(schu): check if user owner
        $question_id = $request->question_id;
        $deck->questions()->attach($question_id);
        return response()->noContent();
    }

    public function removeQuestionById(Request $request, Deck $deck)
    {
        // TODO(schu): check if user owner
        $question_id = $request->question_id;
        $deck->questions()->detach($question_id);
        return response()->noContent();
    }
}
