<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

use App\Models\Answer;
use App\Models\AnswerChoice;
use App\Models\Question;

class QuestionController extends Controller
{
    public function index()
    {
        return Question::with('images')->get();
    }

    public function store(Request $request)
    {
        $question = new Question();
        $question->text = $request->text;

        $question->save();

        $answers = Answer::find($request->answers);
        $question->answers()->saveMany($answers);

        return response()->json($question);
    }

    public function show($id)
    {
        $question = Question::with('answers', 'images')->find($id);
        return response()->json($question);
    }

    public function showByLegacyId(Request $request)
    {
        $legacy_question_id = $request->get('id');
        $question = Question::where('legacy_question_id', '=', $legacy_question_id)->first();
        if ($question == null) {
            abort(404);
        }
        return response()->json($question);
    }

    public function update(Request $request, Question $question)
    {
        $question->fill($request->all());

        if ($request->answers) {
            $answerIds = array_map(function ($a) {
                return $a['id'];
            }, $request->answers);

            $answers = Answer::findMany($answerIds);
            $question->answers()->saveMany($answers);
        }

        $question->save();

        // Update all answer choices for this question as the correct
        // answer could have been changed
        $answerChoices = AnswerChoice::where('question_id', '=', $question->id)->get();
        foreach ($answerChoices as $answerChoice) {
            $answerChoice->is_correct = $answerChoice->answer_id == $question->correct_answer_id;
            $answerChoice->save();
        }

        return response()->json($question);
    }
}
