<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\AnswerChoice;
use App\Models\Session;

class ApiAnswerChoiceController extends Controller
{
    public function store(Request $request, Session $session)
    {
        if (Auth::id() != $session->user_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'question_id' => 'required|integer|exists:questions,id',
            'answer_id' => 'nullable|integer|exists:answers,id',
            'help_used' => 'required|boolean',
            'is_correct' => 'required|boolean',
        ]);

        try {
            $answerChoice = DB::transaction(function () use ($validated, $session) {
                return AnswerChoice::updateOrCreate(
                    [
                        'session_id' => $session->id,
                        'question_id' => $validated['question_id'],
                    ],
                    [
                        'answer_id' => $validated['answer_id'],
                        'help_used' => $validated['help_used'],
                        'is_correct' => $validated['is_correct'],
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
