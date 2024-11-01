<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\Rule;

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

    public function create()
    {
        abort_unless(Auth::user()->is_admin, 403);

        return view('user');
    }

    public function edit(User $user)
    {
        abort_unless(Auth::user()->is_admin, 403);

        return view('user', [
            'user' => $user,
        ]);
    }

    public function store(Request $request)
    {
        abort_if(!Auth::user()->is_admin, 403);

        $request->validate([
            'name' => 'required|string|unique:users',
            'email' => 'required|email|unique:users',
            'public_name' => 'nullable|string|unique:users',
        ]);

        $user = new User();
        $user->fill($request->all());
        $user->save();

        Password::sendResetLink(['id' => $user->id]);

        $user->sendEmailVerificationNotification();

        return redirect()->route('users.edit', [
            'user' => $user->id,
        ])->with('msg-success', 'User created, password and verification link sent');
    }

    public function update(Request $request, User $user)
    {
        abort_unless(Auth::user()->is_admin, 403);

        $request->validate([
            'name' => 'required','string', Rule::unique('users')->ignore($user->id),
            'email' => 'required', 'email', Rule::unique('users')->ignore($user->id),
            'public_name' => 'nullable', 'string', Rule::unique('users')->ignore($user->id),
        ]);

        $user->fill($request->all());
        $user->save();

        return redirect()->route('users.edit', [
            'user' => $user->id,
        ])->with('msg-success', 'User edited');
    }

    public function reset_password(User $user)
    {
        abort_unless(Auth::user()->is_admin && config('app.login.form'), 403);

        Password::sendResetLink(['id' => $user->id]);

        return redirect()->route('users.edit', [
            'user' => $user->id,
        ])->with('msg-success', 'Password reset link sent to user');
    }

}
