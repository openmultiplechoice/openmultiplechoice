<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Question;

class DeckQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Deck $deck)
    {
        $questions = $deck->questions()->with('answers', 'images')->get();
        return response()->json($questions);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Deck $deck)
    {
        if ($request->id) {
            $question = Question::findOrFail($request->id)->get();
        } else {
            $question = new Question;
        }

        $question->text = $request->text;
        $question->correct_answer_id = $request->correct_answer_id;
        $question->answers()->saveMany($request->answers);
        $question->save();

        $deck->questions()->attach($question);

        return response()->json($question);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Deck  $deck
     * @return \Illuminate\Http\Response
     */
    public function show(Deck $deck, Question $question)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Deck  $deck
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Deck $deck, Question $question)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Deck  $deck
     * @return \Illuminate\Http\Response
     */
    public function destroy(Deck $deck)
    {
        //
    }
}
