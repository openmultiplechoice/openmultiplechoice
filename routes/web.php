<?php

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

use App\Http\Controllers\DeckController;
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

Route::get('/', function () {
    $news = News::orderByDesc('id')->where('sticky', true)->take(2)->get()->concat(
        News::orderByDesc('id')->where('sticky', false)->take(2)->get()
    );
    $sessions = Session::orderByDesc('id')->get();
    return view('index', [
        'news' => $news,
        'sessions' => $sessions
    ]);
})->name('index');

Route::resource('/decks', DeckController::class);

Route::resource('/sessions', SessionController::class);
Route::get('/sessions/{session}', [SessionController::class, 'show'])->name('show.session');
