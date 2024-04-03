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
            ])->orderByDesc('id')->paginate(20);
        return view('messages', ['messages' => $messages]);
    }
}
