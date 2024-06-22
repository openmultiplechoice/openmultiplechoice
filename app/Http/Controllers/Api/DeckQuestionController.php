<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Question;

class DeckQuestionController extends Controller
{
    public function index(Deck $deck)
    {
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);

        $questions = $deck->questions()->with('answers', 'images')->get();

        return response()->json($questions);
    }

    public function store(Request $request, Deck $deck)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        if ($request->id) {
            $question = Question::findOrFail($request->id)->get();
        } else {
            $question = new Question();
        }

        $question->type = $request->type;
        $question->text = $request->text;
        $question->hint = $request->hint;
        $question->comment = $request->comment;
        $question->case_id = $request->case_id;
        $question->correct_answer_id = $request->correct_answer_id;
        $question->legacy_question_id = $request->legacy_question_id;
        $question->answers()->saveMany($request->answers);
        $question->save();

        $deck->questions()->attach($question);

        return response()->json($question);
    }

    public function destroy(Deck $deck, Question $question)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        $deck->questions()->detach($question->id);

        if ($question->decks->isEmpty()) {
            $question->delete();
        }

        return response()->noContent();
    }
}
