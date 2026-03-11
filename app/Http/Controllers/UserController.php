<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'public_name' => 'nullable|string|max:255|unique:users,public_name,' . Auth::id(),
        ]);

        $user = Auth::user();

        $user->public_name = $validated['public_name'] ?? null;
        try {
            $user->save();
        } catch (\Illuminate\Database\UniqueConstraintViolationException $e) {
            return back()->withErrors([
                'public_name' => 'Public name "' .$request->public_name. '" is already taken',
            ]);
        }

        return back();
    }
}
