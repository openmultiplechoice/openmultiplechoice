<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Question;

class DeckQuestionController extends Controller
{
    public function index(Request $request)
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(Deck $deck, Question $question)
    {
        $questions = $deck->questions()->orderBy('id', 'asc')->get();

        $question->load('answers', 'images');

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

        return view('question', [
            'deck' => $deck,
            'question' => $question,
            'questions' => $questions,
            'urlPrev' => $urlPrev,
            'urlNext' => $urlNext,
        ]);
    }

    public function edit(Deck $deck)
    {
        //
    }

    public function update(Request $request, Deck $deck)
    {
        //
    }

    public function destroy($id)
    {
        //
    }
}
