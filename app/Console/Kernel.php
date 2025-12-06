<?php

namespace App\Console;

use Carbon\Carbon;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

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
            $sevenDaysAgo = Carbon::now()->subDays(7)->startOfHour();

            $driver = DB::connection()->getDriverName();

            // Database-agnostic hour truncation expression
            $hourExpression = match ($driver) {
                'pgsql' => "DATE_TRUNC('hour', answer_choices.created_at)",
                'mysql', 'mariadb' => "DATE_FORMAT(answer_choices.created_at, '%Y-%m-%d %H:00:00')",
                'sqlite' => "strftime('%Y-%m-%d %H:00:00', answer_choices.created_at)",
                default => "DATE_FORMAT(answer_choices.created_at, '%Y-%m-%d %H:00:00')",
            };

            // Count answers per hour using database aggregation
            $answersByHour = DB::table('answer_choices')
                ->select(DB::raw("{$hourExpression} as hour"), DB::raw('COUNT(*) as count'))
                ->where('created_at', '>=', $sevenDaysAgo)
                ->groupBy(DB::raw($hourExpression))
                ->get()
                ->pluck('count', 'hour');

            // Count unique users per hour using JOIN and COUNT DISTINCT
            $usersByHour = DB::table('answer_choices')
                ->select(DB::raw("{$hourExpression} as hour"), DB::raw('COUNT(DISTINCT sessions.user_id) as count'))
                ->join('sessions', 'answer_choices.session_id', '=', 'sessions.id')
                ->where('answer_choices.created_at', '>=', $sevenDaysAgo)
                ->groupBy(DB::raw($hourExpression))
                ->get()
                ->pluck('count', 'hour');

            // Fill in missing hours with zeros
            $range = Carbon::parse($sevenDaysAgo)->hoursUntil(Carbon::now());
            $answersByHourFilled = [];
            $usersByHourFilled = [];

            foreach ($range as $hour) {
                $hourString = $hour->format('Y-m-d H:i:s');
                $hourStringISO8601 = $hour->format('Y-m-d\TH:i:s\Z');
                $answersByHourFilled[$hourStringISO8601] = $answersByHour[$hourString] ?? 0;
                $usersByHourFilled[$hourStringISO8601] = $usersByHour[$hourString] ?? 0;
            }

            Cache::put('stats/answers/byhour', $answersByHourFilled);
            Cache::put('stats/users/byhour', $usersByHourFilled);
        })->name('updateActivityStats')->everyTwoMinutes()->withoutOverlapping();

        $schedule->call(function () {
            $newDecks = Deck::where('access', '=', 'public-rw-listed')
                ->select('id', 'name')
                ->orderBy('id', 'desc')
                ->limit(6)
                ->with('questions:id')
                ->get();

            Cache::put('stats/decks/new', $newDecks);

            // Get the 6 most popular (public) decks of the last X days. X is increased
            // until 6 decks with at least 2 sessions are found or 256 days is reached.
            // Use JOIN instead of whereHas/withCount to avoid correlated subqueries.
            foreach ([2, 4, 8, 16, 32, 64, 128, 256] as $subDays) {
                $popularDecksTimespan = $subDays;
                $cutoffDate = Carbon::now()->subDays($subDays);

                $popularDecks = Deck::select('decks.id', 'decks.name', 'decks.access',
                                    DB::raw('COUNT(sessions.id) as sessions_count'))
                    ->join('sessions', 'decks.id', '=', 'sessions.deck_id')
                    ->where('decks.access', '=', 'public-rw-listed')
                    ->where('sessions.created_at', '>=', $cutoffDate)
                    ->groupBy('decks.id', 'decks.name', 'decks.access')
                    ->having(DB::raw('COUNT(sessions.id)'), '>', 1)
                    ->orderByDesc(DB::raw('COUNT(sessions.id)'))
                    ->limit(6)
                    ->get();

                // Eager load questions after grouping (can't use with() in GROUP BY query)
                $popularDecks->load('questions:id');

                if ($popularDecks->count() == 6 && $popularDecks->min('sessions_count') > 1) {
                    break;
                }
            }
            Cache::put('stats/decks/popular_timespan', $popularDecksTimespan);
            Cache::put('stats/decks/popular', $popularDecks);

            // Get the 6 most recently used decks that are publicly available.
            // Use subquery JOIN instead of correlated subquery in ORDER BY to
            // reduce the execution time.
            $latestSessionsSubquery = DB::table('sessions')
                ->select('deck_id', DB::raw('MAX(sessions.created_at) as last_session_at'))
                ->groupBy('deck_id');

            $lastUsedDecks = Deck::select('decks.*', 'latest_sessions.last_session_at')
                ->joinSub($latestSessionsSubquery, 'latest_sessions', function ($join) {
                    $join->on('decks.id', '=', 'latest_sessions.deck_id');
                })
                ->whereIn('decks.access', ['public-rw-listed', 'public-rw', 'public-ro'])
                ->orderByDesc('latest_sessions.last_session_at')
                ->limit(6)
                ->with('questions:id')
                ->get();

            Cache::put('stats/decks/last_used', $lastUsedDecks);
        })->name('updateDeckStats')->everyTwoMinutes()->withoutOverlapping();

        $schedule->call(function () {
            // Calculate answer percentages for multiple choice questions

            // - If the last answer_choice ID is not in the cache, assume the
            //   last 100 answer_choices should be processed
            // - If the last answer_choice ID is in the cache, get the next 10
            //   answer_choices since the last answer_choice that was processed

            // - For each answer_choice, get the related question and all answers,
            //   plus a calculated answer_choices_count for both the question and
            //   the answers (to avoid excessive queries below)
            // - The query contains two ORDER BY clauses because the DISTINCT ON
            //   PostgreSQL clause requires that the expressions match the initial
            //   ORDER BY expression (while we actually want to order by id before we LIMIT)

            $lastAnswerChoiceID = Cache::get('internal/last_answer_percentage_calculation', AnswerChoice::max('id') - 100);

            $answerChoices = AnswerChoice::select('id', 'question_id', 'answer_id')
                ->where('id', '>', $lastAnswerChoiceID)
                ->where('answer_id', '!=', null)
                ->whereHas('question', function ($query) {
                    $query->where('type', 'mc');
                })
                ->distinct('question_id')
                ->orderBy('question_id')
                ->orderBy('id')
                ->limit(10)
                ->with(['question' => function ($query) {
                    $query->select('id')
                        ->withCount(['answer_choices' => function ($query) {
                            $query->where('answer_id', '!=', null);
                        }])
                        ->with(['answers' => function ($query) {
                            $query->select('id', 'question_id', 'answer_percentage')->withCount('answer_choices');
                        }]);
                }])
                ->get();

            // Calculate the answer percentages for each answer of each question
            foreach ($answerChoices as $answerChoice) {
                $question = $answerChoice->question;
                $questionAnswerChoicesCount = $question->answer_choices_count;
                $totalPercentage = 0;
                $totalRoundedPercentage = 0;

                foreach ($question->answers as $answer) {
                    $answerChoicesCount = $answer->answer_choices_count;
                    $answerPercentage = $answerChoicesCount / $questionAnswerChoicesCount * 100;
                    $roundedPercentage = round($answerPercentage);
                    $answer->answer_percentage = $roundedPercentage;
                    $totalPercentage += $answerPercentage;
                    $totalRoundedPercentage += $roundedPercentage;

                    // If we have reached the last answer (`round($totalPercentage) == 100` is true)
                    // and the total rounded percentage is not 100, adjust the last answer to make
                    // the total rounded percentage 100
                    if (round($totalPercentage) == 100 && $totalRoundedPercentage != 100) {
                        $difference = 100 - $totalRoundedPercentage;
                        $answer->answer_percentage += $difference;
                        $totalRoundedPercentage += $difference;
                    }
                    $answer->save();
                }
                $lastAnswerChoiceID = $answerChoice->id;
            }

            // Cache the last answer_choice ID for the next run
            Cache::put('internal/last_answer_percentage_calculation', $lastAnswerChoiceID);
        })->name('updateAnswerDistributionStats')->everyThirtySeconds()->withoutOverlapping();

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
