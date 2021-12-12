<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Models\Deck;

class DeckController extends Controller
{
    public function store(Request $request)
    {
        $deck = new Deck();

        $deck->name = $request->name;
        $deck->official = $request->has('official');
        $deck->module_id = $request->module_id;

        $deck->save();

        return response()->json($deck);
    }
}
