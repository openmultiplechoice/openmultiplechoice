<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\Module;
use App\Models\Subject;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $subjects = Subject::orderBy('name')->get();

        return view('modules', [
            'subjects' => $subjects,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!$request->user()->is_admin && !$request->user()->is_moderator) {
            abort(403, 'Unauthorized');
        }

        abort_if(!$request->subject_id, 400);

        $subject = Subject::find($request->subject_id);
        abort_if(!$subject, 400);

        $module = new Module();
        $module->fill($request->all());
        $module->save();

        $subject->modules()->save($module);

        return redirect()->route('show.module', [
            'module' => $module->id,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Module  $module
     * @return \Illuminate\Http\Response
     */
    public function show(Module $module)
    {
        $subjects = Subject::orderBy('name')->get();

        $decks = $module->decks
            ->filter(function ($deck) {
                return $deck->isPublic() || $deck->isOwnedByUser(Auth::user());
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

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Module  $module
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Module $module)
    {
        if (!$request->user()->is_admin && !$request->user()->is_moderator) {
            abort(403, 'Unauthorized');
        }

        abort_if(!$request->subject_id, 400);

        $subject = Subject::find($request->subject_id);
        abort_if(!$subject, 400);

        $module->fill($request->all());
        $module->save();

        $subject->modules()->save($module);

        return redirect()->route('show.module', [
            'module' => $module->id,
        ]);
    }
}
