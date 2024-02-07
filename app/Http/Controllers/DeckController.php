<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Module;

class DeckController extends Controller
{
    public function index(Request $request)
    {
        $decks = Deck::where([
                ['user_id', '=', Auth::id()],
                ['access', '!=', 'public-rw-listed'],
                ['is_ephemeral', '=', false],
            ])->get();
        return view('decks', ['decks' => $decks]);
    }

    public function store(Request $request)
    {
        $deck = new Deck();

        $deck->fill($request->all());
        $deck->user_id = Auth::id();

        $deck->save();

        return back()->with('msg-success', 'New deck "'. $deck->name .'" created!');
    }

    public function show(Deck $deck)
    {
        $questions = $deck->questions()->orderBy('id', 'asc')->get();
        $nextQuestion = $questions->first();

        $urlPrev = null;
        $urlNext = null;
        if ($nextQuestion) {
            $urlNext = '/decks/'. $deck->id .'/questions/'. $nextQuestion->id;
        }
        return view('deck', [
            'deck' => $deck,
            'questions' => $questions,
            'urlPrev' => $urlPrev,
            'urlNext' => $urlNext,
        ]);
    }

    public function edit(Deck $deck)
    {
        $modules = Module::orderBy('name')->get();

        return view('deck-editor', [
            'deck' => $deck,
            'modules' => $modules,
        ]);
    }

    public function update(Request $request, Deck $deck)
    {
        // TODO(schu): check if the user is allowed to update the deck
        if ($deck->user_id != Auth::id() && !$request->user()->is_admin) {
            abort(403, 'Unauthorized');
        }

        $deck->update($request->all());
        $deck->save();

        return back();
    }
}
