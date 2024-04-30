<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\RegistrationToken;

class RegistrationTokenController extends Controller
{
    public function index()
    {
        abort_unless(Auth::user()->is_admin, 403);
        $tokens = RegistrationToken::paginate(25);
        return view('registration-token', ['tokens' => $tokens]);
    }

    public function store(Request $request)
    {
        abort_unless(Auth::user()->is_admin, 403);
        $data = $request->validate([
            'count' => ['required', 'integer', 'min:1', 'max:1000'],
            'expires_in' => ['required', 'integer', 'in:1,7,14,30'],
            'output_format' => ['required', 'string', 'in:json,csv'],
        ]);
        $expires_at = now()->addDays($data['expires_in']);
        $tokens = RegistrationToken::factory()->count($data['count'])->create(['expires_at' => $expires_at])->map(function ($token) {
            return $token->only('token', 'expires_at');
        });
        if ($data['output_format'] === 'json') {
            return response()->json($tokens)
                ->header('Content-Disposition', 'attachment; filename="tokens.json"');
        } else {
            $csv = "token,expires_at\n";
            $csv .= $tokens->map(function ($token) {
                return $token['token'].",".$token['expires_at'];
            })->implode("\n");
            return response($csv)->header('Content-Type', 'text/csv')
                ->header('Content-Disposition', 'attachment; filename="tokens.csv"');
        }
    }

    public function destroy(RegistrationToken $token)
    {
        abort_unless(Auth::user()->is_admin, 403);
        $token->delete();
        return back()->with('msg-success', 'Token deleted.');
    }
}
