<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::orderBy('name')->get();

        return view('subjects', ['subjects' => $subjects]);
    }

    public function store(Request $request)
    {
        if (!$request->user()->is_admin && !$request->user()->is_moderator) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:500',
        ]);

        $subject = new Subject();
        $subject->fill($validated);
        $subject->save();

        return redirect()->route('show.subject', [
            'subject' => $subject->id,
        ]);
    }

    public function show(Subject $subject)
    {
        $modules = $subject->modules->sortBy('name');

        return view('subject', [
            'subject' => $subject,
            'modules' => $modules,
        ]);
    }

    public function update(Request $request, Subject $subject)
    {
        if (!$request->user()->is_admin && !$request->user()->is_moderator) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:500',
        ]);

        $subject->fill($validated);
        $subject->save();

        return redirect()->route('show.subject', [
            'subject' => $subject->id,
        ]);
    }
}
