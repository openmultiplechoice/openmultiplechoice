<?php

namespace App\Console;

use Carbon\Carbon;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Cache;

use App\Models\AnswerChoice;
use App\Models\Deck;
use App\Models\Session;
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
                $answersByHour[$hourString] = isset($answerChoicesByHour[$hourString]) ? count($answerChoicesByHour[$hourString]) : 0;
                $usersByHour[$hourString] = isset($answerChoicesByHour[$hourString]) ?
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
            // Get the 10 newest decks
            $newDecks = Deck::where('access', '=', 'public-rw-listed')
                ->select('id', 'name')
                ->orderBy('id', 'desc')
                ->limit(6)
                ->with('questions:id')
                ->get();

            Cache::put('stats/decks/new', $newDecks);

            // Get the 10 most popular decks of the last 7 days
            $sessionDecks = Session::where('created_at', '>=', Carbon::now()->subDays(7))
                ->select('deck_id')
                ->with('deck:id,name,access', 'deck.questions:id', 'deck.sessions:id,deck_id')
                ->groupBy('deck_id')
                ->get()
                ->map(function ($s) { return $s->deck;});

            // Filter out private decks
            $popularDecks = $sessionDecks->where('access', '=', 'public-rw-listed')->take(6);

            Cache::put('stats/decks/popular', $popularDecks);
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
