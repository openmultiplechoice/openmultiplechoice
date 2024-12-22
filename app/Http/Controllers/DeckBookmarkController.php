<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\Deck;

class DeckBookmarkController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $bookmarked_decks = $user->bookmarkedDecks()->paginate(10);

        return view('decks-bookmarks', ['bookmarked_decks' => $bookmarked_decks]);
    }

    public function store(Deck $deck)
    {
        $user = Auth::user();
        $user->bookmarkedDecks()->attach($deck);

        return redirect()->back();
    }

    public function destroy(Deck $deck)
    {
        $user = Auth::user();
        $user->bookmarkedDecks()->detach($deck);

        return redirect()->back();
    }
}
