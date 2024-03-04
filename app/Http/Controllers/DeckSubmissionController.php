<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Deck;
use App\Models\DeckSubmission;

class DeckSubmissionController extends Controller
{
    /*
     * Show the deck submissions including metadata of each submitted deck.
     * Should only be accessible by admins and moderators.
     */
    public function index(Request $request)
    {
        if (!$request->user()->is_admin && !$request->user()->is_moderator) {
            abort(403, 'Unauthorized');
        }
        $submissions = DeckSubmission::all();
        return view('deck-submissions', ['submissions' => $submissions]);
    }

    /*
     * Store a new deck submission.
     * Should only be accessible by the deck owner or admins.
     */
    public function store(Request $request)
    {
        $deck = Deck::with('submission')->findOrFail($request->deck_id);
        if (!$request->user()->is_admin && !$request->user()->id == $deck->user_id) {
            abort(403, 'Unauthorized');
        }
        // If the deck was already submitted or is already listed publicly, return an error message.
        if ($deck->submission()->exists() or $deck->access == 'public-rw-listed') {
            return back()->with('msg-error', 'This deck was already submitted!');
        }

        $submission = new DeckSubmission();

        // Get deck_id from hidden input field, user_id from Auth
        $submission->deck_id = $request->deck_id;
        $submission->user_id = Auth::id();

        $submission->save();

        return back()->with('msg-success', 'New submission for deck "'. $submission->deck->name .'" created!');
    }

    /*
     * Delete a deck submission, i.e. retracting or rejecting it.
     * Should only be accessible by the deck owner, admins or moderators.
     */
    public function destroy(Request $request, DeckSubmission $submission)
    {
        if (!$request->user()->is_admin && !$request->user()->is_moderator
            && !$request->user()->id == $submission->deck->user_id) {
            abort(403, 'Unauthorized');
        }
        // Get name of deck before deleting it
        $name = $submission->deck->name;
        $submission->delete();
        return back()->with('msg-success', 'Submission for deck "'. $name .'" deleted!');
    }

    /*
     * Approve a deck submission, i.e. making the deck publicly listed.
     * Should only be accessible by admins and moderators.
     */
    public function approve(Request $request, DeckSubmission $submission)
    {
        if (!$request->user()->is_admin && !$request->user()->is_moderator) {
            abort(403, 'Unauthorized');
        }
        // Set deck access to public-rw-listed (= shown on create session page) and save it
        $submission->deck->access = 'public-rw-listed';
        $submission->deck->save();
        // Get name of deck before deleting it
        $name = $submission->deck->name;
        $submission->delete();
        return back()->with('msg-success', 'Submission for deck "'. $name .'" approved!');
    }
}
