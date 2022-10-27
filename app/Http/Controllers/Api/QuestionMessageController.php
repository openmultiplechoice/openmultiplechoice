<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Message;
use App\Models\Question;

class QuestionMessageController extends Controller
{
    public function index(Question $question)
    {
        $messages = $question->messages()->with('author')->get();
        return response()->json($messages);
    }

    public function store(Request $request, Question $question)
    {
        $message = new Message();
        $message->fill($request->all());
        $message->question_id = $question->id;
        $message->author_id = Auth::id();

        $question->messages()->save($message);

        // Frontend expects author info in the message object
        $message->load('author');

        return response()->json($message);
    }
}
