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
        return response()->json([
            'modules' => $modules,
        ]);
    }

    public function store(Request $request)
    {
        $module = new Module();

        $module->name = $request->name;

        $module->save();

        return response()->json($module);
    }

    public function showByName(Request $request, $name)
    {
        $module = Module::where('name', '=', $name)->firstOrFail();
        return response()->json($module);
    }
}
