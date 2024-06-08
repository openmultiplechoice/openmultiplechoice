<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

use App\Models\UserSettings;

class UserSettingsController extends Controller
{
    public function show()
    {
        $user = Auth::user();

        $userSettings = [
            'id' => $user->id,
            'name' => $user->name,
            'public_name' => $user->public_name,
            'is_admin' => $user->is_admin,
            'is_moderator' => $user->is_moderator,

            'last_subject_id' => $user->settings->last_subject_id,
            'last_module_id' => $user->settings->last_module_id,

            'session_show_sidebar' => $user->settings->session_show_sidebar,
            'session_exam_mode' => $user->settings->session_exam_mode,
            'session_shuffle_answers' => $user->settings->session_shuffle_answers,
            'session_multiple_answer_tries' => $user->settings->session_multiple_answer_tries,
        ];

        return response()->json($userSettings);
    }

    public function update(Request $request)
    {
        $user = Auth::user();

        $userSettings = UserSettings::updateOrCreate(['user_id' => $user->id], $request->all());

        return response()->json($userSettings);
    }
}
