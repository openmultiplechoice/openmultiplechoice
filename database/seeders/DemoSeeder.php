<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Answer;
use App\Models\Deck;
use App\Models\News;
use App\Models\Question;

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        News::create([
            'title' => 'Please note: demo resets happen without notice',
            'text' => 'All test data will be destroyed.',
            'level' => 'warning',
            'sticky' => true,
        ]);
        News::create([
            'title' => 'Welcome!',
            'text' => 'This is the OpenMultipleChoice demo instance.
            OpenMultipleChoice is a work in progress (and comes with
            stubs and bugs).',
            'sticky' => true,
        ]);

        $deck = Deck::create([
            'name' => 'OpenMultipleChoice Demo Deck',
            'official' => true,
        ]);

        $answers = [
            Answer::create([
                'text' => 'A car model.',
            ])->id,
            Answer::create([
                'text' => 'An open source web application for multiple choice exam exercises.',
            ])->id,
            Answer::create([
                'text' => 'An ideology.',
            ])->id,
            Answer::create([
                'text' => 'The title of the latest book by Siri Hustvedt.',
            ])->id,
            Answer::create([
                'text' => 'A fruit.',
            ])->id,
        ];
        $question = Question::create([
            'text' => 'What is OpenMultipleChoice?',
            'correct_answer_id' => $answers[1],
        ]);
        $question->answers()->attach($answers);
        $deck->questions()->attach($question);

        $answers = [
            Answer::create([
                'text' => 'Beerware',
            ])->id,
            Answer::create([
                'text' => 'Apache 2.0',
            ])->id,
            Answer::create([
                'text' => 'BSD',
            ])->id,
            Answer::create([
                'text' => 'MIT',
            ])->id,
            Answer::create([
                'text' => 'AGPL v2',
            ])->id,
        ];
        $question = Question::create([
            'text' => 'What is the license of OpenMultipleChoice?',
            'correct_answer_id' => $answers[4],
        ]);
        $question->answers()->attach($answers);
        $deck->questions()->attach($question);

        $answers = [
            Answer::create([
                'text' => 'C',
            ])->id,
            Answer::create([
                'text' => 'Swift',
            ])->id,
            Answer::create([
                'text' => 'Go',
            ])->id,
            Answer::create([
                'text' => 'Python',
            ])->id,
            Answer::create([
                'text' => 'PHP',
            ])->id,
        ];
        $question = Question::create([
            'text' => 'What programming language is OpenMultipleChoice written in?',
            'correct_answer_id' => $answers[4],
        ]);
        $question->answers()->attach($answers);
        $deck->questions()->attach($question);
    }
}
