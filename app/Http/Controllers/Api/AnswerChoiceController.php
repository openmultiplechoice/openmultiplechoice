<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\AnswerChoice;
use App\Models\Session;

class AnswerChoiceController extends Controller
{
    public function store(Request $request, Session $session)
    {
        if (Auth::id() != $session->user_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        try {
            $answerChoice = DB::transaction(function () use ($request, $session) {
                return AnswerChoice::updateOrCreate(
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
            }, 3);
        } catch (Throwable $t) {
            abort(500, 'Failed to save answer');
        }

        return response()->json($answerChoice);
    }

    public function destroy(Request $request, Session $session, $answerChoiceId)
    {
        if (Auth::id() != $session->user_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        AnswerChoice::destroy($answerChoiceId);

        return response()->noContent();
    }
}
