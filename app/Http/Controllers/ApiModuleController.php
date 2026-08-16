<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Module;

class ApiModuleController extends Controller
{
    public function index()
    {
        $modules = Module::with('subject')->get();

        return response()->json($modules);
    }

    public function store(Request $request)
    {
        abort_if(!$request->user()->is_admin && !$request->user()->is_moderator, 403);

        $validated = $request->validate([
            'name' => 'required|string|max:500',
            'subject_id' => 'required|integer|exists:subjects,id',
            'description' => 'nullable|string',
        ]);

        $module = Module::create($validated);

        return response()->json($module);
    }

    public function show(Module $module)
    {
        return response()->json($module->load('subject'));
    }

    public function update(Request $request, Module $module)
    {
        abort_if(!$request->user()->is_admin && !$request->user()->is_moderator, 403);

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:500',
            'subject_id' => 'sometimes|required|integer|exists:subjects,id',
            'description' => 'sometimes|nullable|string',
        ]);

        $module->update($validated);

        return response()->json($module);
    }

    public function showByName(Request $request)
    {
        abort_if(!$request->name, 400);
        $module = Module::where('name', '=', $request->name)->firstOrFail();

        return response()->json($module);
    }
}
