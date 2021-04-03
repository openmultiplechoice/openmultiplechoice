<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Deck;
use App\Models\Session;

class SessionController extends Controller
{
    public function index()
    {
        $decks = Deck::all();
        $sessions = Session::orderByDesc('id')->get();
        return view('sessions', [
            'decks' => $decks,
            'sessions' => $sessions,
        ]);
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $newSession = new Session;

        $deck = Deck::findOrFail($request->deck_id);

        $newSession->deck_id = $deck->id;
        $newSession->name = $deck->name;
        $newSession->current_question_id = $newSession->deck->questions->first()->id;
        $newSession->save();

        return redirect()->route('show.session', [
            'session' => $newSession->id
        ]);
    }

    public function show(Session $session)
    {
        return view('session', [
            'session' => $session,
        ]);
    }

    public function edit(Session $session)
    {
        //
    }

    public function update(Request $request, Session $session)
    {
        //
    }

    public function destroy(Session $session)
    {
        //
    }
}
