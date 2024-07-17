<?php

namespace App\Console;

use Carbon\Carbon;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Cache;

use App\Models\AnswerChoice;
use App\Models\Deck;
use App\Models\RegistrationToken;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->call(function () {
            // Get an array of all answer choices of the last 7 days,
            // grouped by the full hour
            $answerChoicesByHour = AnswerChoice::where('created_at', '>=', Carbon::now()->subDays(7))
                ->with('session:id,user_id')
                ->get()
                ->groupBy(function ($a) {
                    return Carbon::parse($a->created_at)->minute(0)->second(0);
                })->all();

            // Get a range of all hours from 7 days ago until now, e.g.
            // 2023-11-13 08:00:00
            // 2023-11-13 09:00:00
            // ...
            $range = Carbon::parse(Carbon::now()->startOfHour()->subDays(7))->hoursUntil(Carbon::now());

            // For each hour, count the number of answers and users
            $answersByHour = [];
            $usersByHour = [];
            foreach($range as $hour) {
                $hourString = $hour->format('Y-m-d H:i:s');
                $hourStringISO8601 = $hour->format('Y-m-d\TH:i:s\Z');
                $answersByHour[$hourStringISO8601] = isset($answerChoicesByHour[$hourString]) ? count($answerChoicesByHour[$hourString]) : 0;
                $usersByHour[$hourStringISO8601] = isset($answerChoicesByHour[$hourString]) ?
                    count(array_unique(
                        $answerChoicesByHour[$hourString]
                            ->map(function ($ac) { return $ac->session->user_id; })
                            ->toArray()
                    )) : 0;
            }

            Cache::put('stats/answers/byhour', $answersByHour);
            Cache::put('stats/users/byhour', $usersByHour);
        })->everyTwoMinutes();

        $schedule->call(function () {
            // Get the 6 newest decks
            $newDecks = Deck::where('access', '=', 'public-rw-listed')
                ->select('id', 'name')
                ->orderBy('id', 'desc')
                ->limit(6)
                ->with('questions:id')
                ->get();

            Cache::put('stats/decks/new', $newDecks);

            // Get the 6 most popular (public) decks of the last x days. x is increased until 6 decks are found.
            foreach ([2, 4, 8, 16, 32, 64] as $subDays) {
                $popularDecksTimespan = $subDays;
                $popularDecks = Deck::where('access', '=', 'public-rw-listed')
                    ->whereHas('sessions', function ($query) use ($subDays) {
                        $query->where('created_at', '>=', Carbon::now()->subDays($subDays));
                    })
                    ->withCount(['sessions' => function ($query) use ($subDays) {
                        $query->where('created_at', '>=', Carbon::now()->subDays($subDays));
                    }])
                    ->with('questions:id')
                    ->orderBy('sessions_count', 'desc')
                    ->take(6)
                    ->get();
                if ($popularDecks->count() == 6) {
                    break;
                }
            }
            Cache::put('stats/decks/popular_timespan', $popularDecksTimespan);
            Cache::put('stats/decks/popular', $popularDecks);

            // Get the 6 most recently used decks that are publicly available
            $lastUsedDecks = Deck::has('sessions')
                ->whereIn('access', ['public-rw-listed', 'public-rw', 'public-ro'])
                ->with('sessions:id,deck_id,created_at', 'questions:id')
                ->orderBy(
                    Deck::select('created_at')
                        ->from('sessions')
                        ->whereColumn('sessions.deck_id', 'decks.id')
                        ->orderByDesc('created_at')
                        ->limit(1),
                    'desc'
                )
                ->limit(6)
                ->get();

            Cache::put('stats/decks/last_used', $lastUsedDecks);
        })->everyTwoMinutes();

        // Clear expired password reset tokens every 15 minutes
        $schedule->command('auth:clear-resets')->everyFifteenMinutes();

        // Clear expired registration tokens every 15 minutes
        $schedule->call(function () {
            RegistrationToken::where('expires_at', '<', now())->delete();
        })->everyFifteenMinutes();
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');

        require base_path('routes/console.php');
    }
}
