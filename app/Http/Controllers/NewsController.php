<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\News;

class NewsController extends Controller
{
    public function index()
    {
        return News::all();
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $newEntry = new News();

        $newEntry->title = $request->title;
        $newEntry->text = $request->text;

        $newEntry->save();

        return response()->json($newEntry);
    }

    public function show(News $news)
    {
        //
    }

    public function edit(News $news)
    {
        //
    }

    public function update(Request $request, News $news)
    {
        //
    }

    public function destroy(News $news)
    {
        //
    }
}
