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
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);

        $questions = $deck->questions()->orderBy('id', 'asc')->get();

        $nextQuestion = $questions->first();

        // Load the submission relationship to check if the deck has been submitted (used in template)
        $deck->load('submission');

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
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        $modules = Module::orderBy('name')->get();
        // Load the submission relationship to check if the deck has been submitted (used in template)
        $deck->load('submission');

        return view('deck-editor', [
            'deck' => $deck,
            'modules' => $modules,
        ]);
    }

    public function update(Request $request, Deck $deck)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        // You should not be able to change the access level to "public-rw-listed" here
        abort_if($deck->access != "public-rw-listed" && $request->access == "public-rw-listed", 403);

        // You should not be able to change the access level to "public-rw-listed" here
        abort_if($deck->access == "public-rw-listed" && $request->access && $request->access != "public-rw-listed", 403);

        // You should not be able to archive the deck if it was submitted or listed
        $is_submitted_or_listed = ($deck->submission()->exists() || $deck->access == 'public-rw-listed');
        if ($request->is_archived and $is_submitted_or_listed) {
            return back()->with('msg-error', 'You cannot archive a deck that was submitted or is publicly listed!');
        }

        $deck->update($request->all());
        $deck->access = $request->input('access', 'private');

        $deck->save();

        return redirect()->route(
            'show.deck',
            ['deck' => $deck->id]
        );
    }
}
