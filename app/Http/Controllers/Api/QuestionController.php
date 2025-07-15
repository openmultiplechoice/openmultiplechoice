<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\Answer;
use App\Models\Question;

class QuestionController extends Controller
{
    public function index()
    {
        return Question::with('images')->get();
    }

    public function store(Request $request)
    {
        $question = new Question();
        $question->text = $request->text;

        $question->save();

        $answers = Answer::find($request->answers);
        $question->answers()->saveMany($answers);

        return response()->json($question);
    }

    public function show($id)
    {
        $question = Question::with('answers', 'images', 'case')->find($id);
        return response()->json($question);
    }

    public function showByLegacyId(Request $request)
    {
        $legacy_question_id = $request->get('id');
        $question = Question::where('legacy_question_id', '=', $legacy_question_id)->first();

        abort_unless($question, 404);

        return response()->json($question);
    }

    public function update(Request $request, Question $question)
    {
        // Store the original correct_answer_id before filling the model with new data
        $originalCorrectAnswerId = $question->correct_answer_id;

        try {
            DB::transaction(function () use ($request, $question, $originalCorrectAnswerId) {
                $question->fill($request->all());

                if ($request->answers) {
                    $answerIds = array_map(function ($a) {
                        return $a['id'];
                    }, $request->answers);

                    $answers = Answer::findMany($answerIds);
                    $question->answers()->saveMany($answers);
                }

                $question->save();

                // Only update answer choices if the correct_answer_id has changed
                if ($originalCorrectAnswerId !== $question->correct_answer_id) {
                    // Update all answer choices for this question as the correct answer has been changed
                    DB::statement(
                        'UPDATE answer_choices SET is_correct = CASE WHEN answer_id = ? THEN TRUE ELSE FALSE END WHERE question_id = ?',
                        [$question->correct_answer_id, $question->id]
                    );
                }
            });
        } catch (\Throwable $t) {
            Log::error('Failed to update question: ' . $t->getMessage());
            abort(500, 'Failed to update question');
        }

        return response()->json($question);
    }
}
