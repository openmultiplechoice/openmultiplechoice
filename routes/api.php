<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DeckController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\NewsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('api')->resource('decks', DeckController::class);
Route::middleware('api')->resource('questions', QuestionController::class);
Route::middleware('api')->resource('answers', AnswerController::class);
Route::middleware('api')->resource('news', NewsController::class);
Route::middleware('api')->resource('sessions', SessionController::class);
