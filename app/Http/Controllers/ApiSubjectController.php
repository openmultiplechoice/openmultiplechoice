<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Subject;

class ApiSubjectController extends Controller
{
    public function index()
    {
        $subjects = Subject::with('modules', 'modules.decks')->get();
        return response()->json([
            'subjects' => $subjects,
        ]);
    }

    public function store(Request $request)
    {
        abort_if(!$request->user()->is_admin && !$request->user()->is_moderator, 403);

        $validated = $request->validate([
            'name' => 'required|string|max:500',
        ]);

        $subject = new Subject();

        $subject->name = $validated['name'];

        $subject->save();

        return response()->json($subject);
    }

    public function showByName(Request $request)
    {
        abort_if(!$request->name, 400);
        $subject = Subject::where('name', '=', $request->name)->firstOrFail();
        return response()->json($subject);
    }
}
