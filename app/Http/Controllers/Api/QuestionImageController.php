<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

use App\Models\Image;
use App\Models\Question;

class QuestionImageController extends Controller
{
    public function store(Request $request, Question $question)
    {
        $image = new Image();
        $image->path = Storage::putFile('images', $request->file('image'));
        $question->images()->save($image);

        return response()->json($image);
    }
}
