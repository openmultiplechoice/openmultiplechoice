<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use Laravel\Socialite\Facades\Socialite;

use App\Http\Controllers\DeckController;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\SessionQuestionController;
use App\Models\News;
use App\Models\Session;
use App\Models\User;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/', function () {
        $news = News::orderByDesc('id')->take(4)->get();
        return view('index', [
            'news' => $news,
        ]);
    })->name('index');

    Route::resource('/decks', DeckController::class);

    Route::resource('/sessions', SessionController::class);
    Route::get('/sessions/{session}', [SessionController::class, 'show'])->name('show.session');

    Route::resource('/tokens', TokenController::class);
    Route::get('/tokens', [TokenController::class, 'index'])->name('index.tokens');

    Route::get('/logout', function () {
        Auth::guard('web')->logout();
        return redirect('/');
    });
});

Route::get('/login', function () {
    if (Auth::guard('web')->check()) {
        return redirect()->route('index');
    }
    return view('login');
})->name('login');

Route::post('/login', function (Request $request) {
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        if ($request->session) {
            $request->session->regenerate();
        }

        return redirect()->intended('/');
    }

    return back()->withErrors([
        'login' => 'Invalid credentials.',
    ]);
});

Route::get('/auth/keycloak/redirect', function () {
    return Socialite::driver('keycloak')->redirect();
})->name('keycloak-login');

Route::get('/auth/keycloak/callback', function () {
    if (Auth::guard('web')->check()) {
        return redirect()->route('index');
    }

    try {
        $keycloakUser = Socialite::driver('keycloak')->user();
    } catch (Exception $e) {
        report($e);
        return redirect('login')->withErrors([
            'login' => 'Something went wrong, please try again or contact support.',
        ]);
    }

    $keycloakUserDetails = Socialite::driver('keycloak')->userFromToken($keycloakUser->token);

    $user = User::updateOrCreate([
        'email' => $keycloakUserDetails->getEmail(),
    ], [
        'name' => $keycloakUserDetails->getNickname(),
        'email' => $keycloakUserDetails->getEmail(),
    ]);

    Auth::login($user);

    return redirect()->intended('/');
});

Route::get('/auth/keycloak/backchannel-logout', function () {
    // TODO(schu): support backchannel logout
    return response()->noContent();
});
