<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Deck;
use App\Models\Module;
use App\Models\Session;
use App\Models\Question;

class SessionController extends Controller
{
    public function index(Request $request)
    {
        $sessions = Session::orderBy('id', 'desc')
            ->where('user_id', '=', Auth::id())
            ->with('answerchoices')
            ->with('deck.questions:id,correct_answer_id,is_invalid');

        if ($request->has('take')) {
            // TODO: is this safe?
            $take = $request->take;
            $sessions = $sessions->take($take);
        }

        $sessions = $sessions->get();

        return response()->json($sessions);
    }

    public function store(Request $request)
    {
        $deck = Deck::findOrFail($request->deck_id);

        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 404);

        abort_if($deck->questions->isEmpty(), 400);

        $newSession = new Session();

        $newSession->deck_id = $deck->id;
        $newSession->name = $deck->name;
        $newSession->current_question_id = $newSession->deck->questions->first()->id;
        $newSession->user_id = Auth::id();
        $newSession->save();

        return response()->json($newSession);
    }

    public function newFromIncorrect(Request $request, Session $session)
    {
        abort_if($session->user_id != Auth::id(), 404);

        $answerChoices = $session->answerChoices()->where('is_correct', false)->get();
        if (!$answerChoices || $answerChoices->isEmpty()) {
            abort(400, 'No incorrect answers in this session');
        }

        $question_ids = $answerChoices->map(function ($ac) { return $ac->question_id; });

        $deck = new Deck();
        $deck->is_ephemeral = true;
        $deck->name = 'Repeat incorrect questions of session '. $session->id;
        $deck->user_id = Auth::id();
        $deck->parent_session_id = $session->id;

        $deck->save();

        $deck->questions()->attach($question_ids);

        $newSession = new Session();

        $newSession->deck_id = $deck->id;
        $newSession->name = $deck->name;
        $newSession->current_question_id = $deck->questions()->first()->id;
        $newSession->user_id = Auth::id();
        $newSession->parent_session_id = $session->id;
        $newSession->save();

        return response()->json($newSession);
    }

    public function newFromQuestionIds(Request $request)
    {
        $questions = Question::findMany($request->question_ids);
        if (!$questions) {
            abort(400, 'No question IDs given');
        }

        $deckName = $request->deck_name ?? 'Repeat '. count($questions) .' incorrect questions';

        if ($request->module_id) {
            $module = Module::findOrFail($request->module_id);
            $deckName = $deckName .' of module "'. $module->name .'"';
        }

        $deck = new Deck();
        $deck->is_ephemeral = true;
        $deck->name = $deckName;
        $deck->user_id = Auth::id();

        $deck->save();

        $deck->questions()->attach($questions);

        $newSession = new Session();

        $newSession->deck_id = $deck->id;
        $newSession->name = $deck->name;
        $newSession->current_question_id = $deck->questions()->first()->id;
        $newSession->user_id = Auth::id();
        $newSession->save();

        return response()->json($newSession);
    }

    public function show(Session $session)
    {
        abort_if($session->user_id != Auth::id(), 404);

        $deck = Deck::with('questions', 'cases', 'questions.images', 'questions.answers', 'questions.case')->find($session->deck_id);
        abort_if($deck->access == "private" && $deck->user_id != Auth::id() && !Auth::user()->is_admin, 400);

        $session = $session->load('answerChoices');

        // If all questions have been removed from the
        // underlying deck, error out.
        // TODO(schu): is there a better HTTP error code?
        // TODO(schu): give the user a clue what's wrong
        abort_if($deck->questions->isEmpty(), 410);

        // If the sessions's current question has
        // been deleted, set it to the first question
        if (!in_array($session->current_question_id, array_column($deck->questions->toArray(), 'id'))) {
            $session->current_question_id = $deck->questions()->first()->id;
            $session->save();
        }

        return response()->json([
            'session' => $session,
            'deck' => $deck
        ]);
    }

    public function update(Request $request, Session $session)
    {
        abort_if($session->user_id != Auth::id(), 404);

        $session->update($request->all());

        return response()->json($session);
    }

    public function destroy(Session $session)
    {
        abort_if($session->user_id != Auth::id(), 404);

        $session->delete();

        return response()->json(['message' => 'Session deleted successfully']);
    }
}
