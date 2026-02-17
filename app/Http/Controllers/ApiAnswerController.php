<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Answer;

class ApiAnswerController extends Controller
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
