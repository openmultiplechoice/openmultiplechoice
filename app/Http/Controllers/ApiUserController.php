<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\User;

class ApiUserController extends Controller
{
    public function store(Request $request)
    {
        abort_unless(Auth::user()->is_admin, 403);

        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:users,name',
            'email' => 'required|email|max:255|unique:users,email',
            'public_name' => 'nullable|string|max:255|unique:users,public_name',
            'is_admin' => 'nullable|boolean',
            'is_moderator' => 'nullable|boolean',
            'is_enabled' => 'nullable|boolean',
            'legacy_user_id' => 'nullable|integer',
        ]);

        $user = new User();
        $user->fill($validated);
        $user->save();

        return response()->json($user);
    }

    public function showByLegacyId(Request $request)
    {
        abort_unless(Auth::user()->is_admin, 403);

        $legacy_user_id = $request->get('id');
        $user = User::where('legacy_user_id', '=', $legacy_user_id)->first();

        abort_unless($user, 404);

        return response()->json($user);
    }
}
