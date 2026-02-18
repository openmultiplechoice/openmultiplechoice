<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

use App\Models\Image;
use App\Models\Question;

class ApiQuestionImageController extends Controller
{
    public function store(Request $request, Question $question)
    {
        $request->validate([
            'image' => 'required|image|max:10240',
        ]);

        $image = new Image();
        $image->path = Storage::putFile('images', $request->file('image'));
        $question->images()->save($image);

        return response()->json($image);
    }
}
