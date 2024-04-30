<?php

namespace App\Http\Controllers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

use App\Models\AdminSettingsSignup;
use App\Models\RegistrationToken;
use App\Models\User;

class RegistrationController extends Controller
{
    public function create()
    {
        abort_unless(config('app.signup_enabled'), 404);
        $config = AdminSettingsSignup::find(1)->settings ?? [
                'signup_mode' => null,
                'signup_allowed_email' => null,
            ];
        return view('signup', ['config' => $config]);
    }

    public function store(Request $request)
    {
        abort_unless(config('app.signup_enabled'), 404);
        // TODO(levinuss) extract validation of the allowed domains setting to a separate class and do it cleaner
        $admin_settings_signup = AdminSettingsSignup::find(1)->settings ?? [
                'signup_mode' => null,
                'signup_allowed_email' => null,
            ];
        $allowed_domain = $admin_settings_signup['signup_allowed_email'];

        $data = $request->validate([
            'name' => ['required', 'string', 'unique:users'],
            'email' => ['required', 'email', 'unique:users',
                Rule::when($allowed_domain, 'ends_with:@'.$allowed_domain)],
            'password' => ['required', 'string', 'min:12', 'confirmed'],
        ]);
        $user = User::create($data);

        $user->password = Hash::make($data['password']);

        $signup_mode = $admin_settings_signup['signup_mode'];
        // Disable users per default, exceptions where users are enabled without admin interaction are declared below
        $user->is_enabled = false;
        if ($signup_mode === 'open') {
            $user->is_enabled = true;
        } elseif ($signup_mode === 'token' && $request['token']) {
            // TODO(levinuss) should users without token be able to sign up at all? -> maybe move token validation up
            $user_token = RegistrationToken::where('token', $request['token'])->first();
            if ($user_token && $user_token->expires_at > now()) {
                $user->is_enabled = true;
                $user_token->delete();
            }
        }

        $user->save();

        event(new Registered($user));

        return redirect()->route('login')->with('msg-success', 'Account created. Please verify your email address to log in.');
    }
}
