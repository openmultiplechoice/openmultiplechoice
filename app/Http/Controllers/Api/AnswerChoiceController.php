<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\AnswerChoice;
use App\Models\Session;

class AnswerChoiceController extends Controller
{
    public function store(Request $request, Session $session)
    {
        $answerChoice = new AnswerChoice();
        $answerChoice->fill($request->all());
        $answerChoice->session_id = $session->id;
        $answerChoice->save();

        return response()->json($answerChoice);
    }
}
