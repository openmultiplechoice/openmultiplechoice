<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function show(Question $question)
    {
        $question->load('answers', 'images');

        $decks = $question->decks()->where('access', '=', 'public-rw-listed')->get();

        return view('question', [
            'question' => $question,
            'decks' => $decks,
        ]);
    }
}
