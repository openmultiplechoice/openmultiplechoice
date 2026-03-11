<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserSettingsController extends Controller
{
    public function show()
    {
        $user = Auth::user();

        $user->load('settings');

        return view('user-settings', [
            'user' => $user,
        ]);
    }
}
