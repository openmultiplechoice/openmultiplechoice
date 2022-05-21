<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\News;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::orderBy('id', 'desc')->get();
        return view('news', ['news' => $news]);
    }

    public function create(Request $request)
    {
        if (!$request->user()->is_admin) {
            abort(403, 'Unauthorized');
        }

        return view('news-editor');
    }

    public function store(Request $request)
    {
        if (!$request->user()->is_admin) {
            abort(403, 'Unauthorized');
        }

        $newEntry = new News();
        $newEntry->fill($request->all());
        $newEntry->save();

        return redirect()->route('show.news', [
            'news' => $newEntry->id,
        ]);
    }

    public function show(News $news)
    {
        return view('news-single', ['news' => $news]);
    }

    public function edit(Request $request, News $news)
    {
        if (!$request->user()->is_admin) {
            abort(403, 'Unauthorized');
        }

        return view('news-editor', ['news' => $news]);
    }

    public function update(Request $request, News $news)
    {
        if (!$request->user()->is_admin) {
            abort(403, 'Unauthorized');
        }

        $news->update($request->all());
        $news->save();

        return redirect()->route('show.news', [
            'news' => $news->id,
        ]);
    }

    public function destroy(News $news)
    {
        //
    }
}
