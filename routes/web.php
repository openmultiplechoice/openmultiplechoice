<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Http\Controllers\DeckController;
use App\Http\Controllers\TokenController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\SessionQuestionController;
use App\Models\News;
use App\Models\Session;

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
        $news = News::orderByDesc('id')->where('sticky', true)->take(2)->get()->concat(
            News::orderByDesc('id')->where('sticky', false)->take(2)->get()
        );
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
        'email' => 'Invalid credentials.',
    ]);
});
