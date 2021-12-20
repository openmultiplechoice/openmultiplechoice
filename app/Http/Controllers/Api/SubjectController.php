<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Subject;

class SubjectController extends Controller
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
        $subject = new Subject();

        $subject->name = $request->name;

        $subject->save();

        return response()->json($subject);
    }

    public function showByName(Request $request, $name)
    {
        $subject = Subject::where('name', '=', $name)->firstOrFail();
        return response()->json($subject);
    }
}
