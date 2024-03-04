<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use App\Models\Answer;
use App\Models\Module;
use App\Models\Deck;
use App\Models\Image;
use App\Models\Info;
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
        Info::create([
            'title' => 'Please note: demo resets happen without notice',
            'text' => 'All test data will be destroyed.',
            'is_pinned' => true,
        ]);
        Info::create([
            'title' => 'Welcome!',
            'text' => 'This is the OpenMultipleChoice demo instance.
            OpenMultipleChoice is a work in progress (and comes with
            stubs and bugs).',
            'is_pinned' => true,
        ]);

        // Demo deck 1

        $subject = Subject::create([
            'name' => 'Demo',
        ]);

        $module = Module::create([
            'name' => 'Demo',
            'subject_id' => $subject->id,
        ]);

        $deck = Deck::create([
            'name' => 'OpenMultipleChoice Demo Deck',
            'description' => 'You can use the demo deck to get an idea about how OMC works and looks like.',
            'module_id' => $module->id,
            'access' => 'public-rw-listed',
        ]);

        // Question 1

        $question = Question::create([
            'text' => 'What is OpenMultipleChoice?',
            'hint' => 'It\'s software ...',
            'comment' => 'This is a comment that has no purpose other than showing you that questions can have a comment for relevant administrative information.'
        ]);
        Answer::create([
            'text' => 'A car model.',
            'question_id' => $question->id,
        ]);
        $correct_answer = Answer::create([
            'question_id' => $question->id,
            'text' => 'An open source web application for multiple choice exam exercises.',
            'hint' => 'That is correct!',
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

        // Question 2

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

        // Question 3

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

        // Question 4

        $question = Question::create([
            'text' => 'Which backend framework is used in OpenMultipleChoice?',
        ]);
        Answer::create([
            'text' => 'No framework.',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'CakePHP',
            'question_id' => $question->id,
        ]);
        $correct_answer = Answer::create([
            'text' => 'Laravel',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'Symfony',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'Laminas',
            'question_id' => $question->id,
        ]);
        $question->correct_answer_id = $correct_answer->id;
        $question->save();
        $deck->questions()->attach($question);

        // Question 5

        $question = Question::create([
            'text' => 'Which frontend framework is used in OpenMultipleChoice?',
        ]);
        Answer::create([
            'text' => 'No framework.',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'React',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'Vue',
            'question_id' => $question->id,
        ]);
        $correct_answer = Answer::create([
            'text' => 'Svelte',
            'question_id' => $question->id,
        ]);
        Answer::create([
            'text' => 'Preact',
            'question_id' => $question->id,
        ]);
        $question->correct_answer_id = $correct_answer->id;
        $question->save();
        $deck->questions()->attach($question);

        // Demo deck 2

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
            'access' => 'public-rw-listed',
        ]);

        // Question 1

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

        // Question 2

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

        // Question 3

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

        // Question 4

        $question = Question::create([
            'type' => 'card',
        ]);
        Answer::create([
            'text' => 'Isomaltose',
            'question_id' => $question->id,
        ]);
        $question->save();
        $deck->questions()->attach($question);
        $image = Image::create([
            'path' => 'images/HpkN0HppaRSkqIXlNCKa1Mv7jMUI66i4qktZz01n.png',
            'question_id' => $question->id,
        ]);
        $question->images()->save($image);

        // Question 5

        $question = Question::create([
            'type' => 'card',
        ]);
        Answer::create([
            'text' => 'Lactose',
            'question_id' => $question->id,
        ]);
        $question->save();
        $deck->questions()->attach($question);
        $image = Image::create([
            'path' => 'images/WbZxVnP9fbmHdWZJGRtzinGExI90zqO3ygS469ft.png',
            'question_id' => $question->id,
        ]);
        $question->images()->save($image);
    }
}
