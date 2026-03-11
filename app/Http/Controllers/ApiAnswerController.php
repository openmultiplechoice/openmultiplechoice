<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Answer;

class ApiAnswerController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'text' => 'nullable|string|max:4000',
            'hint' => 'nullable|string|max:2000',
            'question_id' => 'required|integer|exists:questions,id',
        ]);

        $answer = new Answer();
        $answer->fill($validated);
        $answer->question_id = $validated['question_id'];
        $answer->save();

        return response()->json($answer);
    }

    public function update(Request $request, Answer $answer)
    {
        $validated = $request->validate([
            'text' => 'sometimes|nullable|string|max:4000',
            'hint' => 'sometimes|nullable|string|max:2000',
        ]);

        $answer->fill($validated);
        $answer->save();

        return response()->json($answer);
    }

    public function destroy(Answer $answer)
    {
        $answer->delete();
        return response()->noContent();
    }
}
