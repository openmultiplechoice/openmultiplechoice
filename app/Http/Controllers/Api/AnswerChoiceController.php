<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\AnswerChoice;
use App\Models\Session;

class AnswerChoiceController extends Controller
{
    public function store(Request $request, Session $session)
    {
        $answerChoice = new AnswerChoice;
        $answerChoice->question_id = $request->question_id;
        $answerChoice->answer_id = $request->answer_id;
        $answerChoice->session_id = $session->id;
        $answerChoice->save();

        return response()->json($answerChoice);
    }
}
