<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

use App\Models\Info;

class InfoController extends Controller
{
    public function index()
    {
        $info = Info::orderBy('id', 'desc')->get();
        return view('info', ['info' => $info]);
    }

    public function create(Request $request)
    {
        if (!$request->user()->is_admin) {
            abort(403, 'Unauthorized');
        }

        return view('info-editor');
    }

    public function store(Request $request)
    {
        if (!$request->user()->is_admin) {
            abort(403, 'Unauthorized');
        }

        $newEntry = new Info();
        $newEntry->fill($request->all());
        $newEntry->save();

        return redirect()->route('show.info', [
            'info' => $newEntry->id,
        ]);
    }

    public function show(Info $info)
    {
        return view('info-single', ['info' => $info]);
    }

    public function edit(Request $request, Info $info)
    {
        if (!$request->user()->is_admin) {
            abort(403, 'Unauthorized');
        }

        return view('info-editor', ['info' => $info]);
    }

    public function update(Request $request, Info $info)
    {
        if (!$request->user()->is_admin) {
            abort(403, 'Unauthorized');
        }

        $info->update($request->all());
        $info->save();

        return redirect()->route('show.info', [
            'info' => $info->id,
        ]);
    }

    public function destroy(Info $info)
    {
        //
    }
}
