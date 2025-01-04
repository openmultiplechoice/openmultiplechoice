<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;

use App\Http\Controllers\Controller;
use App\Models\Deck;

class DeckBookmarkController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $bookmarkedDecks = $user->bookmarkedDecks();

        return response()->json($bookmarkedDecks);
    }

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
