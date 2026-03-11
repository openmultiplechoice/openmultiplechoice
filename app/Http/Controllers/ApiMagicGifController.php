<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\MagicGif;

class ApiMagicGifController extends Controller
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
