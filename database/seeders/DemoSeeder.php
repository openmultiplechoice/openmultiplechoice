<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Answer;
use App\Models\Module;
use App\Models\Deck;
use App\Models\Image;
use App\Models\News;
use App\Models\Question;
use App\Models\Subject;

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
        ]);
        News::create([
            'title' => 'Welcome!',
            'text' => 'This is the OpenMultipleChoice demo instance.
            OpenMultipleChoice is a work in progress (and comes with
            stubs and bugs).',
        ]);

        $subject = Subject::create([
            'name' => 'Demo',
        ]);

        $module = Module::create([
            'name' => 'Demo',
            'subject_id' => $subject->id,
        ]);

        $deck = Deck::create([
            'name' => 'OpenMultipleChoice Demo Deck',
            'module_id' => $module->id,
            'official' => true,
        ]);

        $question = Question::create([
            'text' => 'What is OpenMultipleChoice?',
            'hint' => 'It\'s software ...',
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

        $image = Image::create([
            'path' => 'images/jF408jdMPdrgt1lNfC7Ubh6kYrE7X31dEHphUqWp.jpg',
            'comment' => 'Image CC BY-SA 3.0 Wikimedia Author "Jsfouche" https://commons.wikimedia.org/wiki/File:2_toed_sloth.jpg',
            'question_id' => $question->id,
        ]);
        $question->images()->save($image);

        $question = Question::create([
            'text' => 'What is the license of OpenMultipleChoice?',
            'hint' => 'GNU Affero General Public License',
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
            'text' => 'AGPL v3',
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

        $subject = Subject::create([
            'name' => 'Biochemistry',
        ]);

        $module = Module::create([
            'name' => 'Biochemistry',
            'subject_id' => $subject->id,
        ]);

        $deck = Deck::create([
            'name' => 'Sugars',
            'module_id' => $module->id,
            'official' => true,
        ]);

        $question = Question::create([
            'type' => 'card',
        ]);
        Answer::create([
            'text' => 'Glucose',
            'question_id' => $question->id,
        ]);
        $question->save();
        $deck->questions()->attach($question);
        $image = Image::create([
            'path' => 'images/RFS3lDzW8ta1Ndm5NGSICy2BbmNbYDkkjXRCJNlf.png',
            'question_id' => $question->id,
        ]);
        $question->images()->save($image);

        $question = Question::create([
            'type' => 'card',
        ]);
        Answer::create([
            'text' => 'Galactose',
            'question_id' => $question->id,
        ]);
        $question->save();
        $deck->questions()->attach($question);
        $image = Image::create([
            'path' => 'images/keIHhJWnbRyli3Kgq0c8pXQMhJmKmsb5MbySWR5P.png',
            'question_id' => $question->id,
        ]);
        $question->images()->save($image);

        $question = Question::create([
            'type' => 'card',
        ]);
        Answer::create([
            'text' => 'Mannose',
            'question_id' => $question->id,
        ]);
        $question->save();
        $deck->questions()->attach($question);
        $image = Image::create([
            'path' => 'images/yiOgHY9jH2duPa5C0hxV1WDA1tWjP43u24Yr4Rbp.png',
            'question_id' => $question->id,
        ]);
        $question->images()->save($image);
    }
}
