<?php

use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use Laravel\Socialite\Facades\Socialite;

use App\Http\Controllers\DeckController;
use App\Http\Controllers\DeckQuestionController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\MagicGIFController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserSettingsController;
use App\Http\Controllers\DeckSubmissionController;
use App\Http\Controllers\UserManagementController;

use App\Models\Info;
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
        $info = Info::where('is_pinned', '=', true)->orderByDesc('id')->get();
        return view('index', [
            'info' => $info,
        ]);
    })->name('index');

    Route::resource('/decks', DeckController::class);
    Route::get('/decks/{deck}', [DeckController::class, 'show'])->name('show.deck');

    Route::get('/messages', [MessageController::class, 'index']);

    Route::get('/decks/{deck}/questions/edit', [DeckQuestionController::class, 'edit']); // This route must be before the next one
    Route::get('/decks/{deck}/questions/{question}', [DeckQuestionController::class, 'show']);

    Route::resource('/questions', QuestionController::class);

    Route::resource('/submissions', DeckSubmissionController::class);
    Route::put('/submissions/{submission}/approve', [DeckSubmissionController::class, 'approve']);

    Route::resource('/subjects', SubjectController::class);
    Route::get('/subjects/{subject}', [SubjectController::class, 'show'])->name('show.subject');

    Route::resource('/modules', ModuleController::class);
    Route::get('/modules/{module}', [ModuleController::class, 'show'])->name('show.module');

    Route::resource('/info', InfoController::class);
    Route::get('/info/{info}', [InfoController::class, 'show'])->name('show.info');

    Route::resource('/sessions', SessionController::class);
    Route::get('/sessions/{session}', [SessionController::class, 'show'])->name('show.session');

    Route::resource('/tokens', TokenController::class);
    Route::get('/tokens', [TokenController::class, 'index'])->name('index.tokens');

    Route::get('/me/settings', [UserSettingsController::class, 'show']);
    Route::put('/me', [UserController::class, 'update']);

    Route::get('/admin/users', [UserManagementController::class, 'index']);
    Route::put('/admin/users/{user}', [UserManagementController::class, 'update']);

    Route::get('/logout', function (Request $request) {
        # https://laravel.com/docs/10.x/authentication#logging-out

        Auth::guard('web')->logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    });

    if (config('app.magic')) {
        Route::resource('/magic-gifs', MagicGIFController::class);
    }
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
        if (!Auth::user()->is_enabled) {
            Auth::logout();
            return back()->withErrors([
                'login' => 'Your account is disabled.',
            ]);
        }
        if ($request->session()) {
            $request->session()->regenerate();
        }
        Auth::user()->last_login_at = Carbon::now();
        Auth::user()->save();

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
