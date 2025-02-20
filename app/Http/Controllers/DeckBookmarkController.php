<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;

use App\Models\Deck;

class DeckBookmarkController extends Controller
{
    private const PAGE_SIZE = 30;

    public function index()
    {
        $user = Auth::user();
        $bookmarkedDecks = $user->bookmarkedDecks()->paginate(self::PAGE_SIZE);

        return view('decks-bookmarks', ['bookmarked_decks' => $bookmarkedDecks]);
    }

    public function store(Deck $deck)
    {
        $user = Auth::user();
        abort_if($deck->access == "private" && $deck->user_id != $user->id && !$user->is_admin, 404);

        $user->bookmarkedDecks()->syncWithoutDetaching($deck);

        return redirect()->back();
    }

    public function destroy(Deck $deck)
    {
        $user = Auth::user();
        $user->bookmarkedDecks()->detach($deck);

        return redirect()->back();
    }
}
