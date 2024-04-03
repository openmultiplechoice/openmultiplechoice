<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;

use App\Models\Message;
use App\Models\Thumb;

class MessageThumbController extends Controller
{
    /**
     * Store a new thumb for the specified message.
     * Users can only vote once on each message, so the request should fail if a thumb already exists for this
     * user and message.
     */
    public function store(Request $request, Message $message)
    {
        abort_if($message->is_deleted, 400, 'You cannot vote on a deleted message.');
        abort_if($message->thumbs()->where('user_id', Auth::id())->exists(), 400, 'You have already voted on this message.');

        $thumb = new Thumb();
        $thumb->type = $request->type;

        $thumb->user_id = Auth::id();

        $message->thumbs()->save($thumb);

        return response()->json($thumb, 200);
    }

    /**
     * Update the specified thumb by just changing the type of the thumb (up -> down or down -> up).
     * Other attributes should not be updated.
     * Users can only update their own thumbs, so the request should fail if the thumb was not created by the current
     * user.
     */
    public function update(Request $request, Message $message, Thumb $thumb)
    {
        abort_if($message->is_deleted, 400, 'You cannot vote on a deleted message.');
        abort_if($thumb->user_id != Auth::id(), 403, 'You are not allowed to update this thumb.');

        $thumb->type = $request->type;
        $thumb->save();

        return response()->json($thumb, 200);
    }

    /**
     * Remove the specified thumb.
     * Users can only delete their own thumbs, so the request should fail if the thumb was not created by the current
     * user.
     */
    public function destroy(Request $request, Message $message, Thumb $thumb)
    {
        abort_if($thumb->user_id != Auth::id(), 403, 'You are not allowed to delete this thumb.');

        $thumb->delete();

        return response()->noContent();
    }
}
