<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Deck;
use App\Models\Session;

class SessionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $decks = Deck::all();
        $sessions = Session::orderByDesc('id')->get();
        return view('sessions', [
            'decks' => $decks,
            'sessions' => $sessions,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $newSession = new Session;

        $deck = Deck::findOrFail($request->deck_id);

        $newSession->deck_id = $deck->id;
        $newSession->name = $deck->name;
        $newSession->save();

        $questionId = $newSession->deck->questions->first()->id;

        return redirect()->route(
            'show.session_question',
            ['session' => $newSession->id, 'question' => $questionId]
        )->with('msg-success', 'New session "'. $newSession->name .'" created!');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Session  $session
     * @return \Illuminate\Http\Response
     */
    public function show(Session $session)
    {
        if (isset($session->current_question_id)) {
            $current_question_id = $session->current_question_id;
        } else {
            $current_question_id = $session->deck->questions->first()->id;
        }
        return redirect()->route('show.session_question', [
            'session' => $session->id,
            'question' => $current_question_id,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Session  $session
     * @return \Illuminate\Http\Response
     */
    public function edit(Session $session)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Session  $session
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Session $session)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Session  $session
     * @return \Illuminate\Http\Response
     */
    public function destroy(Session $session)
    {
        //
    }
}
