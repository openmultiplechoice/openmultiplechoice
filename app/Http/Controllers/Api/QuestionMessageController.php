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
        $messages = $question->messages()
            ->with('thumbs', function ($query) {
                $query->select('id', 'thumbable_id', 'type', 'user_id')
                    ->where('user_id', Auth::id());
            })
            ->withCount(['thumbs as thumbs_up_count' => function ($query) {
                $query->where('type', 'up');
            }, 'thumbs as thumbs_down_count' => function ($query) {
                $query->where('type', 'down');
            }])
            ->get();

        // Load author info for messages which are
        // not anonymous and for messages of the
        // current user
        $messages->filter(function ($m) {
            return !$m->is_anonymous || $m->author_id == Auth::id();
        })->load('author:id,name,public_name');

        $messages->each(function ($m) {
            // - For non-anyonymous messages (author relation loaded),
            //   set the author name to public_name, if set
            // - For anonymous messages, set author_id to null to make
            //   sure we don't leak the author's ID
            if ($m->relationLoaded('author')) {
                if ($m->author->public_name) {
                    $m->author->name = $m->author->public_name;
                }
            } else {
                $m->author_id = null;
            }

            // If the message is soft deleted, set the text to an empty
            // string to avoid leaking the message content
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
        $message->load('author:id,name,public_name');

        $message->thumbs = [];
        $message->thumbs_up_count = 0;
        $message->thumbs_down_count = 0;

        return response()->json($message);
    }
}
