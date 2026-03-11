<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TokenController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->user()->is_admin) {
            return redirect()->route('index');
        }
        $tokens = $request->user()->tokens()->get();
        return view('tokens', ['tokens' => $tokens]);
    }

    public function store(Request $request)
    {
        if (!$request->user()->is_admin) {
            return redirect()->route('index');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $token = $request->user()->createToken($validated['name']);
        $request->session()->flash('msg-success', 'Your token: '.$token->plainTextToken);
        return redirect()->route('index.tokens');
    }
}
