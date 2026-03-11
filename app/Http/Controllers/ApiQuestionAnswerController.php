<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Answer;
use App\Models\Question;

class ApiQuestionAnswerController extends Controller
{
    public function store(Request $request, Question $question)
    {
        $validated = $request->validate([
            'id' => 'nullable|integer|exists:answers,id',
            'text' => 'nullable|string|max:4000',
            'hint' => 'nullable|string|max:2000',
        ]);

        if (!empty($validated['id'])) {
            $answer = Answer::findOrFail($validated['id']);
        } else {
            $answer = new Answer();
        }

        $answer->text = $validated['text'] ?? null;
        $answer->hint = $validated['hint'] ?? null;

        $question->answers()->save($answer);

        return response()->json($answer);
    }
}
