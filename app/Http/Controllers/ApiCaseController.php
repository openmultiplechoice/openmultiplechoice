<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\QuestionCase;

class ApiCaseController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'text' => 'nullable|string|max:4000',
            'legacy_case_id' => 'nullable|integer',
            'deck_id' => 'nullable|integer|exists:decks,id',
        ]);

        $case = new QuestionCase();
        $case->text = $validated['text'] ?? null;
        $case->legacy_case_id = $validated['legacy_case_id'] ?? null;

        $case->save();

        if (!empty($validated['deck_id'])) {
            $case->decks()->attach($validated['deck_id']);
        }

        return response()->json($case);
    }

    public function showByLegacyId(Request $request)
    {
        $legacy_case_id = $request->get('id');
        $case = QuestionCase::where('legacy_case_id', '=', $legacy_case_id)->first();

        abort_unless($case, 404);

        return response()->json($case);
    }

    public function update(Request $request, QuestionCase $case)
    {
        $validated = $request->validate([
            'text' => 'nullable|string|max:4000',
        ]);

        $case->text = $validated['text'] ?? null;

        $case->save();

        return response()->json($case);
    }
}
