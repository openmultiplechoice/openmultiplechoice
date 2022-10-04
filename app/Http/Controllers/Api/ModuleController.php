<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Module;

class ModuleController extends Controller
{
    public function index()
    {
        $modules = Module::with('decks')->get();
        return response()->json($modules);
    }

    public function store(Request $request)
    {
        // TODO(schu): check if user is moderator or admin
        $module = new Module();

        $module->name = $request->name;
        $module->subject_id = $request->subject_id;

        $module->save();

        return response()->json($module);
    }

    public function showByName(Request $request, $name)
    {
        $module = Module::where('name', '=', $name)->firstOrFail();
        return response()->json($module);
    }
}
