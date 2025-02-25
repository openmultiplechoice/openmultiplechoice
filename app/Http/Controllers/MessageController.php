<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\Message;

class MessageController extends Controller
{
    public function index()
    {
        $messages = Message::where([
                ['author_id', '=', Auth::id()],
                ['is_deleted', '=', false],
            ])
            ->with('author:id,name,public_name')
            ->withCount(['thumbs as thumbs_up_count' => function ($query) {
                $query->where('type', 'up');
            }, 'thumbs as thumbs_down_count' => function ($query) {
                $query->where('type', 'down');
            }])
            ->orderByDesc('created_at', 'desc')->paginate(20);
        return view('messages', ['messages' => $messages]);
    }
}
