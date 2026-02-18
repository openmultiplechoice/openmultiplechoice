<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Module;
use App\Models\Subject;

class ModuleController extends Controller
{
    public function index()
    {
        $subjects = Subject::orderBy('name')->get();

        return view('modules', [
            'subjects' => $subjects,
        ]);
    }

    public function store(Request $request)
    {
        if (!$request->user()->is_admin && !$request->user()->is_moderator) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:500',
            'subject_id' => 'required|integer|exists:subjects,id',
        ]);

        $subject = Subject::findOrFail($validated['subject_id']);

        $module = new Module();
        $module->fill($validated);
        $module->save();

        $subject->modules()->save($module);

        return redirect()->route('show.module', [
            'module' => $module->id,
        ]);
    }

    public function show(Module $module)
    {
        $subjects = Subject::orderBy('name')->get();

        $decks = $module->decks
            ->filter(function ($deck) {
                return $deck->isPublic() || $deck->isOwnedBy(Auth::user());
            })
            ->sortBy('name')
            ->map(function ($deck) {
                return (object) [
                    'id' => $deck->id,
                    'name' => $deck->name,
                ];
            });

        return view('module', [
            'module' => $module,
            'subjects' => $subjects,
            'decks' => $decks,
        ]);
    }

    public function update(Request $request, Module $module)
    {
        if (!$request->user()->is_admin && !$request->user()->is_moderator) {
            abort(403, 'Unauthorized');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:500',
            'subject_id' => 'required|integer|exists:subjects,id',
        ]);

        $subject = Subject::findOrFail($validated['subject_id']);

        $module->fill($validated);
        $module->save();

        $subject->modules()->save($module);

        return redirect()->route('show.module', [
            'module' => $module->id,
        ]);
    }
}
