<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Session;

class SessionController extends Controller
{
    public function store(Request $request)
    {
        $newSession = new Session();

        $deck = Deck::findOrFail($request->deck_id);

        $newSession->deck_id = $deck->id;
        $newSession->name = $deck->name;
        $newSession->current_question_id = $newSession->deck->questions->first()->id;
        $newSession->save();

        return response()->json($newSession);
    }

    public function show(Session $session)
    {
        $deck = Deck::with('questions', 'questions.images', 'questions.answers')->find($session->deck_id);
        return response()->json([
            'session' => $session->load('answerChoices'),
            'deck' => $deck
        ]);
    }

    public function update(Request $request, Session $session)
    {
        $session->update($request->all());
        return response()->json($session);
    }
}
