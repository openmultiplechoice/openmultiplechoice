<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\Question;

class QuestionController extends Controller
{
    public function show(Question $question)
    {
        $question->load('answers', 'images', 'case');

        $decks = $question->decks()->where('access', '=', 'public-rw-listed')->get();

        // Get count of personal / bookmarked decks of the current user that include this question
        $question->loadAddToDeckCount(Auth::user());

        return view('question', [
            'question' => $question,
            'decks' => $decks,
        ]);
    }

    public function indexReviewable()
    {
        // Select questions that need review and are in at least one public (writeable) deck.
        $questions = Question::where(function ($q) {
            $q->where('needs_review', true)
                ->orWhere('is_invalid', true);
        })
            ->whereHas('decks', function ($q) {
                $q->whereIn('access', ['public-rw-listed', 'public-rw']);
            })
            ->with(['decks' => function ($q) {
                $q->whereIn('access', ['public-rw-listed', 'public-rw', 'public-ro'])
                    ->with('module', 'module.subject');
            }])
            ->paginate(25);
        return view('questions-reviewable', [
            'questions' => $questions,
        ]);
    }
}
