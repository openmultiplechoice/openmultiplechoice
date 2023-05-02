<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use Laravel\Socialite\Facades\Socialite;

use App\Http\Controllers\DeckController;
use App\Http\Controllers\DeckQuestionController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\SessionQuestionController;
use App\Http\Controllers\UserSettingsController;

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

    Route::resource('decks.questions', DeckQuestionController::class);

    Route::resource('/questions', QuestionController::class);

    Route::resource('/subjects', SubjectController::class);
    Route::get('/subjects/{subject}', [SubjectController::class, 'show'])->name('show.subject');

    Route::resource('/modules', ModuleController::class);
    Route::get('/modules/{module}', [ModuleController::class, 'show'])->name('show.module');

    Route::resource('/news', NewsController::class);
    Route::get('/news/{news}', [NewsController::class, 'show'])->name('show.news');

    Route::resource('/sessions', SessionController::class);
    Route::get('/sessions/{session}', [SessionController::class, 'show'])->name('show.session');

    Route::resource('/tokens', TokenController::class);
    Route::get('/tokens', [TokenController::class, 'index'])->name('index.tokens');

    Route::get('me/settings', [UserSettingsController::class, 'show']);

    Route::get('/logout', function (Request $request) {
        # https://laravel.com/docs/10.x/authentication#logging-out

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

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
    $remain_logged_in = $request->boolean('remain_logged_in');

    if (Auth::attempt($credentials, $remain_logged_in)) {
        if ($request->session()) {
            $request->session()->regenerate();
        }

        return redirect()->intended('/');
    }

    return back()->withErrors([
        'login' => 'Invalid credentials.',
    ]);
});

Route::get('/auth/keycloak/redirect', function (Request $request) {
    if ($request->boolean('remain_logged_in')) {
        $request->session()->put('remain_logged_in', true);
    }

    return Socialite::driver('keycloak')->redirect();
})->name('keycloak-login');

Route::get('/auth/keycloak/callback', function (Request $request) {
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

    $remain_logged_in = false;
    if ($request->session()) {
        $remain_logged_in = $request->session()->get('remain_logged_in', false);
        $request->session()->forget('remain_logged_id');
    }

    Auth::login($user, $remain_logged_in);

    if ($request->session()) {
        $request->session()->regenerate();
    }

    return redirect()->intended('/');
});

Route::get('/auth/keycloak/backchannel-logout', function () {
    // TODO(schu): support backchannel logout
    return response()->noContent();
});

// A fallback route for all requests that are not handled by the routes
// above and are not found in the `public/` directory.
Route::fallback(function (Request $request) {
    if (!Storage::exists($request->path())) {
        abort(404);
    } else {
        return response()->file(Storage::path($request->path()));
    }
})->middleware('auth:sanctum');
