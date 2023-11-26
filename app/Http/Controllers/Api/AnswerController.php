<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Answer;

class AnswerController extends Controller
{
    public function store(Request $request)
    {
        $answer = new Answer();

        $answer->fill($request->all());

        $answer->save();

        return response()->json($answer);
    }

    public function update(Request $request, Answer $answer)
    {
        $answer->fill($request->all());
        $answer->save();

        return response()->json($answer);
    }

    public function destroy(Answer $answer)
    {
        $answer->delete();
        return response()->noContent();
    }
}
