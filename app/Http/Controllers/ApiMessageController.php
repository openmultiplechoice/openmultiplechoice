<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Message;

class ApiMessageController extends Controller
{
    public function store(Request $request)
    {
        abort_unless(Auth::user()->is_admin, 403);

        $validated = $request->validate([
            'text' => 'nullable|string',
            'question_id' => 'required|integer|exists:questions,id',
            'is_anonymous' => 'nullable|boolean',
            'parent_message_id' => 'nullable|integer|exists:messages,id',
        ]);

        $message = new Message();
        $message->fill($validated);
        $message->save();

        return response()->json($message);
    }

    public function update(Request $request, Message $message)
    {
        abort_if($message->author_id != Auth::id(), 403, 'You are not allowed to update this message.');
        abort_if($message->is_deleted, 400, 'You cannot edit a deleted message.');

        $validated = $request->validate([
            'text' => 'sometimes|nullable|string',
            'is_anonymous' => 'sometimes|boolean',
        ]);

        $message->fill($validated);
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
