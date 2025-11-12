<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Question;
use App\Models\Answer;
use App\Models\Image;

class DeckQuestionController extends Controller
{
    public function index(Deck $deck)
    {
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);

        $questions = $deck->questions()->with('answers', 'images', 'case')->get();

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
        $question->is_invalid = $request->is_invalid;
        $question->needs_review = $request->needs_review;
        $question->legacy_question_id = $request->legacy_question_id;
        $question->answers()->saveMany($request->answers);
        $question->save();

        $deck->questions()->attach($question);

        return response()->json($question);
    }

    public function storeWithAnswers(Request $request, Deck $deck)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        $question = DB::transaction(function () use ($request, $deck) {
            $question = new Question();
            $question->type = $request->type;
            $question->text = $request->text;
            $question->hint = $request->hint;
            $question->comment = $request->comment;
            $question->case_id = $request->case_id;
            $question->is_invalid = $request->is_invalid;
            $question->needs_review = $request->needs_review;
            $question->legacy_question_id = $request->legacy_question_id;
            $question->correct_answer_id = null; // Initially set to null
            $question->save();

            $answers = [];
            foreach ($request->answers as $answerData) {
                $answer = new Answer();
                $answer->text = $answerData['text'];
                $answer->hint = $answerData['hint'];
                $question->answers()->save($answer);
                $answers[] = $answer;
            }

            // Set the correct_answer_id after answers have been created
            if (isset($request->correct_answer_index) && isset($answers[$request->correct_answer_index])) {
                $question->correct_answer_id = $answers[$request->correct_answer_index]->id;
                $question->save();
            }

            $deck->questions()->attach($question);

            $question->answers = $answers;
            return $question;
        });

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
