<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Console\ConfirmableTrait;

use App\Models\Deck;
use App\Models\Question;
use App\Models\Answer;
use App\Models\AnswerChoice;
use App\Models\Session;

class CreateDummyDecks extends Command
{
    use ConfirmableTrait;

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'omc:create-dummy-decks
                            {--name=Test Deck : Name of the test deck}
                            {--numDecks=1 : Number of decks to create}
                            {--userId= : ID of the user who should own the created deck and sessions}
                            {--numQuestions=2 : Number of questions to create}
                            {--numAnswers=2 : Number of answers per question}
                            {--numAnswerChoices=500 : Number of answer choices per answer}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create dummy decks with a configurable number of questions, answers and answer choices';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        // Confirm before proceeding, this will prompt the user to confirm the action if the application is running in production mode
        if (!$this->confirmToProceed()) {
            return 1;
        }

        $deckName = $this->option('name');
        $numDecks = (int)$this->option('numDecks');
        $numQuestions = (int)$this->option('numQuestions');
        $numAnswers = (int)$this->option('numAnswers');
        $numAnswerChoices = (int)$this->option('numAnswerChoices');
        $numSessions = $numAnswerChoices * $numAnswers;
        $userId = $this->option('userId') ? (int)$this->option('userId') : null;

        $this->info("Creating {$numDecks} test deck(s) with:
            - {$numQuestions} questions
            - {$numAnswers} answers per question
            - {$numAnswerChoices} answer choices per answer
            - user ID: " . ($userId ?? 'none'));

        $deckAttributes = [
            'name' => $deckName,
        ];
        if ($userId) {
            $deckAttributes['user_id'] = $userId;
        }

        for ($deckIndex = 0; $deckIndex < $numDecks; $deckIndex++) {
            $deckNumber = $deckIndex + 1;
            $deck = Deck::factory()->create($deckAttributes);

            $this->info("Created deck {$deckNumber}/{$numDecks}: {$deckName}");

            // Create sessions
            $this->info("Creating {$numSessions} sessions for the deck...");

            $sessions = [];

            $bar = $this->output->createProgressBar($numSessions);
            $bar->start();

            for ($i = 0; $i < $numSessions; $i++) {
                $sessions[$i] = Session::factory()->create([
                    'name' => "Session {$i}",
                    'deck_id' => $deck->id,
                    'user_id' => $userId,
                ]);

                $bar->advance();
            }

            $bar->finish();
            $this->line(''); // Add a new line after the progress bar
            $this->info("  Created {$numSessions} sessions for the deck");


            // Create questions with answers
            for ($i = 0; $i < $numQuestions; $i++) {
                $question = Question::factory()->create([
                    'text' => "Test Question {$i}",
                ]);

                // Attach question to deck
                $deck->questions()->attach($question->id);

                $this->info("Created question {$i}: {$question->text}");

                // Create answers for this question
                for ($j = 0; $j < $numAnswers; $j++) {
                    $answer = Answer::factory()->create([
                        'question_id' => $question->id,
                        'text' => "Answer {$j} for Question {$i}",
                    ]);

                    // First answer is correct
                    if ($j === 0) {
                        $question->correct_answer_id = $answer->id;
                        $question->save();
                    }

                    $this->info("  Created answer {$j}: {$answer->text}");

                    $this->info("  Creating {$numAnswerChoices} answer choices for answer {$j}...");

                    // Create a progress bar to track the creation of answer choices
                    $bar = $this->output->createProgressBar($numAnswerChoices);
                    $bar->start();

                    for ($k = 0; $k < $numAnswerChoices; $k++) {
                        AnswerChoice::factory()->create([
                            'question_id' => $question->id,
                            'answer_id' => $answer->id,
                            // Since a session can have only one answer choice per question,
                            // we have prepared `numAnswers * numAnswerChoices` sessions to
                            // be able to hold all answer choices, and we have to select the
                            // sessions array key accordingly to pick the right session:
                            'session_id' => $sessions[
                                $j*$numAnswerChoices // Pick the right group of sessions for the current question and answer..
                                +$k                      // ..and pick the right session in that group for the current answer choice
                            ]->id,
                            'is_correct' => $j === 0, // Mark the first answer as correct
                        ]);

                        $bar->advance();
                    }

                    $bar->finish();
                    $this->line(''); // Add a new line after the progress bar
                    $this->info("  Created {$numAnswerChoices} answer choices for answer {$j}");
                }
            }
        }

        $this->info("Successfully created {$numDecks} test deck(s) with {$numQuestions} questions, {$numAnswers} answers per question, and {$numAnswerChoices} answer choices per answer");
        return 0;
    }
}
