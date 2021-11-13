<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

use App\Models\Answer;
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

    public function update(Request $request, Question $question)
    {
        // TODO(schu): an answers update is missing here
        $question->text = $request->text;
        $question->hint = $request->hint;
        $question->correct_answer_id = $request->correct_answer_id;
        $question->save();

        return response()->json($question);
    }
}
