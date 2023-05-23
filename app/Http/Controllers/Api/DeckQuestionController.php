<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Question;

class DeckQuestionController extends Controller
{
    public function index(Deck $deck)
    {
        $questions = $deck->questions()->with('answers', 'images')->get();
        return response()->json($questions);
    }

    public function store(Request $request, Deck $deck)
    {
        if ($request->id) {
            $question = Question::findOrFail($request->id)->get();
        } else {
            $question = new Question();
        }

        $question->type = $request->type;
        $question->text = $request->text;
        $question->hint = $request->hint;
        $question->correct_answer_id = $request->correct_answer_id;
        $question->legacy_question_id = $request->legacy_question_id;
        $question->answers()->saveMany($request->answers);
        $question->save();

        $deck->questions()->attach($question);

        return response()->json($question);
    }

    public function destroy(Deck $deck, Question $question)
    {
        $deck->questions()->detach($question->id);

        if ($question->decks->isEmpty()) {
            $question->delete();
        }

        return response()->noContent();
    }
}
