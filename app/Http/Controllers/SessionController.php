<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\Deck;
use App\Models\Session;

class SessionController extends Controller
{
    public function index()
    {
        //
    }

    public function create(Request $request)
    {
        if ($request->has('module')) {
            // If a specific module is requested (`?module=...` parameter in
            // URL), it should take precedence over the last selected module;
            // save it in the user's settings as the new `last_module_id`.

            $validated = $request->validate([
                'module' => 'nullable|integer|exists:modules,id',
            ]);

            Auth::user()->settings->last_module_id = $validated['module'];
            Auth::user()->settings->save();
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
        if (Auth::id() != $session->user_id) {
            abort(404);
        }
        return view('session', [
            'session' => $session,
        ]);
    }

    public function edit(Session $session)
    {
        //
    }

    public function update(Request $request, Session $session)
    {
        //
    }

    public function destroy(Session $session)
    {
        //
    }
}
