<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Message;

class MessageController extends Controller
{
    public function update(Request $request, Message $message)
    {
        if (Auth::id() != $message->author_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }

        $message->fill($request->all());
        if ($message->author_id != Auth::id() && !$request->user()->is_admin) {
            abort(403, 'Unauthorized');
        }
        $message->save();

        return response()->json($message);
    }
}
