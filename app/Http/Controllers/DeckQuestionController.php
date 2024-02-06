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
        $questions = $deck->questions()->orderBy('id', 'asc')->get();

        $question->load('answers', 'images');

        if (!$questions->contains('id', $question->id)) {
            abort(404);
        }

        $prevQuestionId = $deck->questions()->where('questions.id', '<', $question->id)->max('questions.id');
        $nextQuestionId = $deck->questions()->where('questions.id', '>', $question->id)->min('questions.id');

        $urlPrev = null;
        if ($prevQuestionId) {
            $urlPrev = '/decks/'. $deck->id .'/questions/'. $prevQuestionId;
        }
        $urlNext = null;
        if ($nextQuestionId) {
            $urlNext = '/decks/'. $deck->id .'/questions/'. $nextQuestionId;
        }

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
        return view('deck-question-editor', ['deck' => $deck]);
    }
}
