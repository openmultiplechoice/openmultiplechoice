<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Answer;
use App\Models\Question;

class QuestionAnswerController extends Controller
{
    public function store(Request $request, Question $question)
    {
        if ($request->id) {
            $answer = Answer::findOrFail($request->id)->get();
        } else {
            $answer = new Answer();
        }

        $answer->text = $request->text;
        $answer->hint = $request->hint;

        $question->answers()->save($answer);

        return response()->json($answer);
    }
}
