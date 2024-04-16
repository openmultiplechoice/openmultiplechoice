<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\MagicGif;

class MagicGifController extends Controller
{
    /**
     * Return a random gif.
     */
    public function show(Request $request)
    {
        $gif = MagicGif::inRandomOrder()->firstOrFail();
        return response()->json($gif);
    }
}
