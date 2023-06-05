<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Session;

class SessionController extends Controller
{
    public function index(Request $request)
    {
        $sessions = Session::orderBy('id', 'desc')
            ->where('user_id', '=', Auth::id())
            ->with('answerchoices')
            ->with('deck.questions:id,correct_answer_id');

        if ($request->has('take')) {
            // TODO: is this safe?
            $take = $request->take;
            $sessions = $sessions->take($take);
        }

        $sessions = $sessions->get();

        return response()->json($sessions);
    }

    public function store(Request $request)
    {
        $newSession = new Session();

        $deck = Deck::findOrFail($request->deck_id);

        $newSession->deck_id = $deck->id;
        $newSession->name = $deck->name;
        $newSession->current_question_id = $newSession->deck->questions->first()->id;
        $newSession->user_id = Auth::id();
        $newSession->save();

        return response()->json($newSession);
    }

    public function newFromIncorrect(Request $request, Session $session)
    {
        $answerChoices = $session->answerChoices()->where('is_correct', false)->get();
        if (!$answerChoices) {
            abort(400, 'No incorrect answers in this session');
        }

        $question_ids = $answerChoices->map(function ($ac) { return $ac->question_id; });

        $deck = new Deck();
        $deck->is_ephemeral = true;
        $deck->name = 'Repeat incorrect questions of session '. $session->id;
        $deck->user_id = Auth::id();

        $deck->save();

        $deck->questions()->attach($question_ids);

        $newSession = new Session();

        $newSession->deck_id = $deck->id;
        $newSession->name = $deck->name;
        $newSession->current_question_id = $deck->questions()->first()->id;
        $newSession->user_id = Auth::id();
        $newSession->save();

        return response()->json($newSession);
    }

    public function show(Session $session)
    {
        if (Auth::id() != $session->user_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $deck = Deck::with('questions', 'questions.images', 'questions.answers')->find($session->deck_id);
        return response()->json([
            'session' => $session->load('answerChoices'),
            'deck' => $deck
        ]);
    }

    public function update(Request $request, Session $session)
    {
        if (Auth::id() != $session->user_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $session->update($request->all());
        return response()->json($session);
    }
}
