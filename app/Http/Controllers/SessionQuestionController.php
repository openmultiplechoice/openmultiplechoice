<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\AnswerChoice;
use App\Models\Question;
use App\Models\Session;

class SessionQuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Session $session, Question $question)
    {
        $answerChoice = new AnswerChoice;

        $answerChoice->session_id = $session->id;
        $answerChoice->answer_id = $request->answer_id;
        $answerChoice->question_id = $question->id;

        $answerChoice->save();

        return back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Session $session, Question $question)
    {
        $answerChoice = AnswerChoice::where('question_id', $question->id)->where('session_id', $session->id)->first();

        $session->current_question_id = $question->id;
        $session->save();

        // Adapted from https://stackoverflow.com/a/21911647
        $previousQuestion = Question::where('id', '<', $question->id)->max('id');
        $nextQuestion = Question::where('id', '>', $question->id)->min('id');

        $urlPrev = null;
        if ($previousQuestion) {
            $urlPrev = '/sessions/'. $session->id .'/questions/'. $previousQuestion;
        }
        $urlNext = null;
        if ($nextQuestion) {
            $urlNext = '/sessions/'. $session->id .'/questions/'. $nextQuestion;
        }

        return view('session_question', [
            'question' => $question,
            'answerChoice' => $answerChoice,
            'urlSession' => '/sessions/'. $session->id,
            'urlPrev' => $urlPrev,
            'urlNext' => $urlNext,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
