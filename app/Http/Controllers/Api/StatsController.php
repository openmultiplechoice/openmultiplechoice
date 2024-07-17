<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

use App\Models\Session;

class StatsController extends Controller
{
    public function activity(Request $request)
    {
        $stats = [
            'answers_byhour' => Cache::get('stats/answers/byhour'),
            'users_byhour' => Cache::get('stats/users/byhour'),
            'decks_new' => Cache::get('stats/decks/new'),
            'decks_popular' => Cache::get('stats/decks/popular'),
            'decks_popular_timespan' => Cache::get('stats/decks/popular_timespan'),
            'decks_last_used' => Cache::get('stats/decks/last_used'),
        ];

        return response()->json($stats);
    }
}
