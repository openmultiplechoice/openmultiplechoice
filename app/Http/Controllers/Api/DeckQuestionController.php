<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Question;
use App\Models\Answer;

class DeckQuestionController extends Controller
{
    public function index(Deck $deck)
    {
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);

        $questions = $deck->questions()->with('answers', 'images', 'case')->get();

        return response()->json($questions);
    }

    public function store(Request $request, Deck $deck)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        $validated = $request->validate([
            'text' => 'nullable|string|max:6000',
            'hint' => 'nullable|string|max:2000',
            'comment' => 'nullable|string|max:2000',
            'type' => 'required|string|in:mc,card',
            'is_invalid' => 'nullable|boolean',
            'needs_review' => 'nullable|boolean',
            'case_id' => 'nullable|integer',
            'legacy_question_id' => 'nullable|integer',
            'answers' => 'nullable|array',
            'answers.*.text' => 'nullable|string|max:2000',
            'answers.*.hint' => 'nullable|string|max:2000',
            'answers.*.is_correct' => 'boolean',
        ]);

        if (isset($validated['answers'])) {
            // Make sure the question has at most one correct answer
            $correctAnswers = collect($validated['answers'])->filter(fn($a) => $a['is_correct'] ?? false);
            if ($correctAnswers->count() > 1) {
                return response()->json(['message' => 'Only one answer can be marked as correct'], 422);
            }
        }

        $question = new Question();

        try {
            $question = DB::transaction(function () use ($validated, $deck, $question) {
                $question->fill($validated);
                $question->legacy_question_id = $validated['legacy_question_id'] ?? null;

                $question->save();

                if (isset($validated['answers'])) {
                    $answers = [];
                    foreach ($validated['answers'] as $answer) {
                        $newAnswer = new Answer();

                        $newAnswer->fill($answer);
                        $newAnswer->question_id = $question->id;

                        $newAnswer->save();

                        $answers[] = $newAnswer;

                        if (isset($answer['is_correct']) && $answer['is_correct']) {
                            $question->correct_answer_id = $newAnswer->id;
                            $question->save();
                        }
                    }

                }

                $deck->questions()->syncWithoutDetaching($question);

                // Include answers in the returned question
                $question->answers = $answers ?? [];
                return $question;
            });

            return response()->json($question);
        } catch (\Exception $e) {
            Log::error('Failed to store question: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to save question. Please try again.'], 500);
        }
    }

    public function destroy(Deck $deck, Question $question)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        $deck->questions()->detach($question->id);

        if ($question->decks->isEmpty()) {
            $question->delete();
        }

        return response()->noContent();
    }
}
