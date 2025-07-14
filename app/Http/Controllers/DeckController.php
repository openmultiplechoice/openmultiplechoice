<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Subject;

class DeckController extends Controller
{
    private const PAGE_SIZE = 30;

    public function index(Request $request)
    {
        $decks = Deck::where([
                ['user_id', '=', Auth::id()],
                ['access', '!=', 'public-rw-listed'],
                ['is_ephemeral', '=', false],
                ['is_archived', '=', false],
            ])->orderBy('id', 'desc')->paginate(self::PAGE_SIZE);

        return view('decks', ['decks' => $decks]);
    }

    public function indexArchived(Request $request)
    {
        $decks = Deck::where([
                ['user_id', '=', Auth::id()],
                ['access', '!=', 'public-rw-listed'],
                ['is_ephemeral', '=', false],
                ['is_archived', '=', true],
            ])->orderBy('id', 'desc')->paginate(self::PAGE_SIZE);

        return view('decks-archived', ['decks' => $decks]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:500',
            'description' => 'max:5000',
            'access' => 'in:private,public-ro,public-rw',
        ]);

        $deck = new Deck();

        $deck->fill($validated);
        $deck->user_id = Auth::id();

        $deck->save();

        return redirect()->route('edit.deck', [
            'deck' => $deck->id,
        ])->with('msg-success', 'Successfully created deck');
    }

    public function show(Deck $deck)
    {
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);

        // Load the questions contained in the deck, ordered by the pivot id (=time of addition to the deck)
        $questions = $deck->questions()->get();

        $nextQuestion = $questions->first();

        // Load the submission relationship to check if the deck has been submitted and count bookmarks (used in template)
        $deck->load('submission');
        $deck->loadCount('bookmarks');

        $urlPrev = null;
        $urlNext = null;
        if ($nextQuestion) {
            $urlNext = '/decks/'. $deck->id .'/questions/'. $nextQuestion->id;
        }

        return view('deck', [
            'deck' => $deck,
            'questions' => $questions,
            'urlPrev' => $urlPrev,
            'urlNext' => $urlNext,
        ]);
    }

    public function edit(Deck $deck)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        $subjects = Subject::orderBy('name')->with('modules')->get();
        // Load the submission relationship to check if the deck has been submitted (used in template)
        $deck->load('submission');

        return view('deck-editor', [
            'deck' => $deck,
            'subjects' => $subjects,
        ]);
    }

    public function update(Request $request, Deck $deck)
    {
        // Decks with access "private" or "public-ro" can only
        // be updated by their owner or an admin
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);
        abort_if($deck->access == "public-ro" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 403);

        // You should not be able to change the access level to "public-rw-listed" here
        abort_if($deck->access != "public-rw-listed" && $request->access == "public-rw-listed", 403);

        // Only admins and moderators should be able to edit "public-rw-listed" decks
        abort_if($deck->access == "public-rw-listed" && !Auth::user()->is_admin && !Auth::user()->is_moderator, 403);

        // You should not be able to archive the deck if it was submitted or listed
        $is_submitted_or_listed = ($deck->submission()->exists() || $deck->access == 'public-rw-listed');
        if ($request->is_archived and $is_submitted_or_listed) {
            return back()->with('msg-error', 'You cannot archive a deck that was submitted or is publicly listed!');
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|max:500',
            'description' => 'max:5000',
            'access' => 'in:private,public-ro,public-rw,public-rw-listed',
            'is_archived' => 'boolean',
            'exam_at' => 'nullable|date',
            'module_id' => 'nullable|exists:modules,id',
        ]);

        $deck->update($validated);
        $deck->access = $request->input('access', 'private');

        $deck->save();

        return back()->with('msg-success', 'Settings updated');
    }
}
