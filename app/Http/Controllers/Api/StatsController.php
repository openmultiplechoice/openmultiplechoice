<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

use App\Models\Session;

class StatsController extends Controller
{
    public function sessionsfordecks(Request $request)
    {
        $sessions = array();
        $userId = Auth::id();
        foreach ($request->decks as $deckId) {
            $latestSession = Session::with('answerChoices', 'deck.questions:id,is_invalid')
                ->where([
                    'user_id' => $userId,
                    'deck_id' => $deckId,
                ])->latest()->first();
            if (!$latestSession) {
                continue;
            }
            $sessions[$deckId] = $latestSession;
        }

        return response()->json($sessions);
    }

    public function activity(Request $request)
    {
        $stats = [
            'answers_byhour' => Cache::get('stats/answers/byhour'),
            'users_byhour' => Cache::get('stats/users/byhour'),
            'decks_new' => Cache::get('stats/decks/new'),
            'decks_popular' => Cache::get('stats/decks/popular'),
        ];

        return response()->json($stats);
    }
}
