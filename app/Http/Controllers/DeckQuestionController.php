<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Question;

class DeckQuestionController extends Controller
{
    public function show(Deck $deck, Question $question)
    {
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);

        $questions = $deck->questions()->orderBy('id', 'asc')->get();

        $question->load('answers', 'images', 'case');

        if (!$questions->contains('id', $question->id)) {
            abort(404);
        }

        // Get the ordered questions from the relationship (ordered by pivot id)
        $orderedQuestions = $deck->questions()->select('questions.id')->get();

        // Find the current question's index in the ordered collection
        $currentIndex = $orderedQuestions->search(function($item) use ($question) {
            return $item->id === $question->id;
        });

        // Determine previous and next questions based on the ordered collection
        $prevQuestionId = $orderedQuestions[$currentIndex - 1]->id ?? null;
        $nextQuestionId = $orderedQuestions[$currentIndex + 1]->id ?? null;

        $urlPrev = null;
        if ($prevQuestionId) {
            $urlPrev = '/decks/'. $deck->id .'/questions/'. $prevQuestionId;
        }
        $urlNext = null;
        if ($nextQuestionId) {
            $urlNext = '/decks/'. $deck->id .'/questions/'. $nextQuestionId;
        }

        // Get count of personal / bookmarked decks of the current user that include this question
        $question->loadAddToDeckCount(Auth::user());

        return view('deck-question', [
            'deck' => $deck,
            'question' => $question,
            'questions' => $questions,
            'urlPrev' => $urlPrev,
            'urlNext' => $urlNext,
        ]);
    }

    public function edit(Deck $deck)
    {
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        return view('deck-question-editor', ['deck' => $deck]);
    }
}
