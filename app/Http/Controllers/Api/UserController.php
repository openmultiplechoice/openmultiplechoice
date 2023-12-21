<?php

namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request)
    {
        abort_unless(Auth::user()->is_admin, 403);

        $user = new User();
        $user->fill($request->all());
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
