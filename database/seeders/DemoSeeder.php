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

        $question = Question::create([
            'text' => 'What is OpenMultipleChoice?',
        ]);
        Answer::create([
            'text' => 'A car model.',
            'question_id' => $question->id,
        ]);
        $correct_answer = Answer::create([
            'question_id' => $question->id,
            'text' => 'An open source web application for multiple choice exam exercises.',
        ]);
        Answer::create([
            'text' => 'An ideology.',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'The title of the latest book by Siri Hustvedt.',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'A fruit.',
            'question_id' => $question->id,
        ]);
        $question->correct_answer_id = $correct_answer->id;
        $question->save();
        $deck->questions()->attach($question);

        $question = Question::create([
            'text' => 'What is the license of OpenMultipleChoice?',
        ]);
        Answer::create([
            'text' => 'Beerware',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'Apache 2.0',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'BSD',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'MIT',
            'question_id' => $question->id,
        ]);
        $correct_answer = Answer::create([
            'text' => 'AGPL v2',
            'question_id' => $question->id,
        ]);
        $question->correct_answer_id = $correct_answer->id;
        $question->save();
        $deck->questions()->attach($question);

        $question = Question::create([
            'text' => 'What programming language is OpenMultipleChoice written in?',
        ]);
        Answer::create([
            'text' => 'C',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'Swift',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'Go',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'Python',
            'question_id' => $question->id,
        ]);
        $correct_answer = Answer::create([
            'text' => 'PHP',
            'question_id' => $question->id,
        ]);
        $question->correct_answer_id = $correct_answer->id;
        $question->save();
        $deck->questions()->attach($question);
    }
}
