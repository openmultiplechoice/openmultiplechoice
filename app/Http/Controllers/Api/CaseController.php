<?php

namespace App\Http\Controllers\Api;

use App\Models\QuestionCase;
use Illuminate\Http\Request;

class CaseController extends Controller
{
    public function store(Request $request)
    {
        $case = new QuestionCase();
        $case->text = $request->text;
        $case->legacy_case_id = $request->legacy_case_id;

        $case->save();

        if ($request->deck_id) {
            $case->decks()->attach($request->deck_id);
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
}
