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
    public function indexByQuestionId(Request $request)
    {
        $validated = $request->validate([
            'question_ids' => 'present|array',
            'question_ids.*' => 'integer',
        ]);

        $questionIds = $validated['question_ids'];

        if (empty($questionIds)) {
            return response()->json(['answer_choices' => []]);
        }

        $latestAnswerIdsSubquery = DB::table('answer_choices')
            ->join('sessions', 'sessions.id', '=', 'answer_choices.session_id')
            ->where('sessions.user_id', Auth::id())
            ->whereIn('answer_choices.question_id', $questionIds)
            ->selectRaw('MAX(answer_choices.id) as max_id')
            ->groupBy('answer_choices.question_id');

        $latestAnswers = DB::table('answer_choices')
            ->joinSub($latestAnswerIdsSubquery, 'latest', function ($join) {
                $join->on('answer_choices.id', '=', 'latest.max_id');
            })
            ->select('answer_choices.question_id', 'answer_choices.is_correct', 'answer_choices.help_used')
            ->get();

        return response()->json([
            'answer_choices' => $latestAnswers,
        ]);
    }

    public function store(Request $request, Session $session)
    {
        if (Auth::id() != $session->user_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'question_id' => 'required|integer',
            'answer_id' => 'nullable|integer',
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
                        'answer_id' => $validated['answer_id'] ?? null,
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
