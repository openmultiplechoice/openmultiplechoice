<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

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
        ]);

        $module = new Module();

        $module->name = $validated['name'];
        $module->subject_id = $validated['subject_id'];

        $module->save();

        return response()->json($module);
    }

    public function showByName(Request $request)
    {
        abort_if(!$request->name, 400);
        $module = Module::where('name', '=', $request->name)->firstOrFail();
        return response()->json($module);
    }
}
