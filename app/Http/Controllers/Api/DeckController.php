<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;

class DeckController extends Controller
{
    public function index()
    {
        return Deck::with('module', 'module.subject')->get();
    }

    public function indexWithQuestionIds(Request $request)
    {
        $user_id = Auth::id();
        $decks = Deck::where('user_id', '=', $user_id)->with('questions:id')->get();
        return response()->json($decks);
    }

    public function store(Request $request)
    {
        $deck = new Deck();

        $deck->name = $request->name;
        $deck->official = $request->has('official');
        $deck->module_id = $request->module_id;

        $deck->save();

        return response()->json($deck);
    }

    public function update(Request $request, Deck $deck)
    {
        // TODO(schu): check if user owner

        $deck->update($request->all());
        return response()->json($deck);
    }

    public function addQuestionById(Request $request, Deck $deck)
    {
        // TODO(schu): check if user owner
        $question_id = $request->question_id;
        $deck->questions()->attach($question_id);
        return response()->noContent();
    }

    public function removeQuestionById(Request $request, Deck $deck)
    {
        // TODO(schu): check if user owner
        $question_id = $request->question_id;
        $deck->questions()->detach($question_id);
        return response()->noContent();
    }
}
