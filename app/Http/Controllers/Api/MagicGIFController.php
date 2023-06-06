<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;

use App\Models\MagicGIF;

class MagicGifController extends Controller
{
    /**
     * Return a random gif.
     */
    public function show(Request $request)
    {
        $gif = MagicGIF::inRandomOrder()->firstOrFail();
        return response()->json($gif);
    }
}
