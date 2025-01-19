<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Module;

class ModuleController extends Controller
{
    public function index()
    {
        $modules = Module::with('subject')->get();
        return response()->json($modules);
    }

    public function store(Request $request)
    {
        abort_if(!$request->user()->is_admin && !$request->user()->is_moderator, 403);

        $module = new Module();

        $module->name = $request->name;
        $module->subject_id = $request->subject_id;

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
