<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function show(Question $question)
    {
        $question->load('answers', 'images', 'case');

        $decks = $question->decks()->where('access', '=', 'public-rw-listed')->get();

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
