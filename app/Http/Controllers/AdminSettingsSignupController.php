<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

use App\Models\AdminSettingsSignup;
use App\Rules\DomainRule;

class AdminSettingsSignupController extends Controller
{
    public function show()
    {
        abort_unless(Auth::user()->is_admin && config('app.signup_enabled'), 403);

        $admin_settings_signup = AdminSettingsSignup::find(1)->settings ?? [
                'signup_mode' => null,
                'signup_allowed_email' => null,
            ];

        return view('admin-settings-signup', [
            'admin_settings_signup' => $admin_settings_signup,
        ]);
    }

    public function update(Request $request)
    {
        abort_unless(Auth::user()->is_admin && config('app.signup_enabled'), 403);

        $data = $request->validate([
            'signup_mode' => ['required', 'in:open,token,manual'],
            'signup_allowed_email' => ['nullable', new DomainRule()],
        ]);

        AdminSettingsSignup::updateOrCreate(['id' => 1], ['settings' => $data]);

        return back();
    }
}
