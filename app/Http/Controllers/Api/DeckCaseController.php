<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\QuestionCase;

class DeckCaseController extends Controller
{
    public function destroy(Deck $deck, QuestionCase $case)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        $deck->cases()->detach($case->id);

        if ($case->decks->isEmpty() && $case->questions->isEmpty()) {
            $case->delete();
        }

        return response()->noContent();
    }
}
