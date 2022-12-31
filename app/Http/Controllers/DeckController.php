<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Deck;

class DeckController extends Controller
{
    public function index(Request $request)
    {
        $decks = Deck::with('questions')->get();
        if ($request->wantsJson()) {
            return response()->json($decks);
        }
        return view('decks', ['decks' => $decks]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $deck = new Deck();

        $deck->name = $request->name;
        $deck->user_id = Auth::id();

        $deck->save();

        return back()->with('msg-success', 'New deck "'. $deck->name .'" created!');
    }

    public function show(Deck $deck)
    {
        $nextQuestion = $deck->questions()->first();

        $urlPrev = null;
        $urlNext = null;
        if ($nextQuestion) {
            $urlNext = '/decks/'. $deck->id .'/questions/'. $nextQuestion->id;
        }
        return view('deck', [
            'deck' => $deck,
            'questions' => $deck->questions()->get(),
            'urlPrev' => $urlPrev,
            'urlNext' => $urlNext,
        ]);
    }

    public function edit(Deck $deck)
    {
        return view('deck-editor', ['deck' => $deck]);
    }

    public function update(Request $request, Deck $deck)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
