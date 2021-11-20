<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

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
}
