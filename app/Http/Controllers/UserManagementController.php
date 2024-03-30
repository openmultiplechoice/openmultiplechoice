<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\User;

class UserManagementController extends Controller
{
    public function index()
    {
        abort_unless(Auth::user()->is_admin, 403);
        $users = User::filter(request(['search']))->paginate(25)->withQueryString();
        return view('user-management', [
            'users' => $users,
        ]);
    }

    public function update(Request $request, $id)
    {
        abort_unless(Auth::user()->is_admin, 403);
        $user = User::findOrFail($id);

        $user->is_enabled = $request->is_enabled;
        $user->save();

        return back();
    }

}
