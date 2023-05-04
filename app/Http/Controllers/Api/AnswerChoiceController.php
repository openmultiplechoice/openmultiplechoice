<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\AnswerChoice;
use App\Models\Session;

class AnswerChoiceController extends Controller
{
    public function store(Request $request, Session $session)
    {
        if (Auth::id() != $session->user_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $answerChoice = AnswerChoice::updateOrCreate(
            [
                'session_id' => $session->id,
                'question_id' => $request->question_id,
            ],
            [
                'answer_id' => $request->answer_id,
                'help_used' => $request->help_used,
                'is_correct' => $request->is_correct,
            ]
        );

        return response()->json($answerChoice);
    }
}
