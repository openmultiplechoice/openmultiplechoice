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
        // TODO: is it possible to load the `author_id`
        // (to later load author info) only for messages
        // which are not anonymous?
        $messages = $question->messages()->with('thumbs')->get();
        // Load author info for messages which are
        // not anonymous and for messages of the
        // current user
        $messages->each(function ($m) {
            if (!$m->is_anonymous || $m->author_id == Auth::id()) {
                $m->load('author:id,name');
            } else {
                // Null the `author_id` for messages
                // which are anonymous to avoid nosy
                // users..
                $m->author_id = null;
            }
            // Load anonymized thumbs for this message to include in the response
            $m->thumbsAnonymized();

            if ($m->is_deleted) {
                $m->text = '';
            }
        });
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
        $message->load('author:id,name');

        // Load anonymized thumbs for this message to include in the response
        $message->thumbsAnonymized();

        return response()->json($message);
    }
}
