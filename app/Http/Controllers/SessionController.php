<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Deck;
use App\Models\Module;
use App\Models\Session;

class SessionController extends Controller
{
    public function create(Request $request)
    {
        $user = Auth::user();
        if ($request->has('module')) {
            // If a specific module is requested (`?module=...` parameter in
            // URL), it should take precedence over the last selected module;
            // save it in the user's settings as the new `last_module_id`.

            $validated = $request->validate([
                'module' => 'nullable|integer|exists:modules,id',
            ]);

            $module = Module::findOrFail($validated['module']);

            $user->settings->last_subject_id = $module->subject_id;
            $user->settings->last_module_id = $module->id;
            $user->settings->save();
        }
        if ($request->has('kind')) {
            $validated = $request->validate([
                'kind' => 'nullable|string|in:public-rw-listed,public,user,bookmarked',
            ]);

            $user->settings->last_new_session_deck_kind = $validated['kind'];
            $user->settings->save();
        }
        return view('sessions');
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

        return redirect()->route('show.session', [
            'session' => $newSession->id
        ]);
    }

    public function show(Session $session)
    {
        abort_if($session->user_id != Auth::id(), 404);
        if ($session->deck->access == "private" && $session->deck->user_id != Auth::id()) {
            return back()->with('msg-error', "Sorry, can't open this session since it links a private deck.");
        }
        return view('session', [
            'session' => $session,
        ]);
    }

    public function edit(Session $session)
    {
        abort_if($session->user_id != Auth::id(), 404);

        return view('session-editor', [
            'session' => $session,
        ]);
    }

    public function update(Request $request, Session $session)
    {
        abort_if($session->user_id != Auth::id(), 404);

        $validated = $request->validate([
            'name' => 'required|string|max:500',
        ]);

        $session->name = $validated['name'];
        $session->save();

        return redirect()->back()->with('msg-success', 'Session updated successfully');
    }

    public function destroy(Session $session)
    {
        abort_if($session->user_id != Auth::id(), 404);

        $session->delete();

        return redirect()->route('index')->with('msg-success', 'Session deleted successfully');
    }
}
