<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;

use App\Models\MagicGIF;

class MagicGifController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        if (!$request->user()->is_admin && !$request->user()->is_moderator) {
            abort(403, 'Unauthorized');
        }
        $gifs = MagicGif::orderByDesc('id')->paginate(15);
        return view('magic-gifs', ['gifs' => $gifs]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!$request->user()->is_admin && !$request->user()->is_moderator) {
            abort(403, 'Unauthorized');
        }

        $request->validate([
            'name' => 'required|max:250',
            'gif' => [
                'required',
                File::types(['gif'])->max(1024 * 1024),
            ],
        ]);

        $gif = new MagicGif();
        $gif->name = $request->name;
        $gif->path = Storage::putFile('magic-gifs', $request->file('gif'));
        $gif->save();

        return back()->with('msg-success', 'GIF added. There will be magic!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
    {
        $gif = MagicGif::findOrFail($id);
        return response()->file(Storage::path($gif->path));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
