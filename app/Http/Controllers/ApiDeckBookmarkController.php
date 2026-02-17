<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\Deck;

class ApiDeckBookmarkController extends Controller
{
    public function store(Deck $deck)
    {
        $user = Auth::user();
        abort_if($deck->access == "private" && $deck->user_id != $user->id && !$user->is_admin, 404);

        $user->bookmarkedDecks()->syncWithoutDetaching($deck);

        return response()->json($deck);
    }

    public function destroy(Deck $deck)
    {
        $user = Auth::user();
        $user->bookmarkedDecks()->detach($deck);

        return response()->noContent();
    }
}
