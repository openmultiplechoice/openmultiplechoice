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
        $user->bookmarkedDecks()->attach($deck);

        return response()->json($deck);
    }

    public function destroy(Deck $deck)
    {
        $user = Auth::user();
        $user->bookmarkedDecks()->detach($deck);

        return response()->noContent();
    }
}
