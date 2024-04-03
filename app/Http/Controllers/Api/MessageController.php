<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Message;

class MessageController extends Controller
{
    public function store(Request $request)
    {
        abort_unless(Auth::user()->is_admin, 403);

        $message = new Message();

        $message->fill($request->all());
        $message->save();

        return response()->json($message);
    }

    public function update(Request $request, Message $message)
    {
        abort_if($message->author_id != Auth::id(), 403, 'You are not allowed to update this message.');
        abort_if($message->is_deleted, 400, 'You cannot edit a deleted message.');

        $message->fill($request->all());
        if ($message->author_id != Auth::id() && !$request->user()->is_admin) {
            abort(403, 'Unauthorized');
        }
        $message->save();

        return response()->json($message);
    }

    public function destroy(Message $message)
    {
        abort_if($message->author_id != Auth::id(), 403, 'You are not allowed to delete this message.');

        $message->is_deleted = true;
        $message->save();

        return response()->noContent();
    }
}
