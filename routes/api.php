<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DeckController;
use App\Http\Controllers\DeckQuestionController;

use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuestionAnswerController;
use App\Http\Controllers\QuestionImageController;

use App\Http\Controllers\ImageController;

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\ApiAnswerChoiceController;

use App\Http\Controllers\NewsController;

use App\Http\Controllers\SessionController;
use App\Http\Controllers\ApiSessionController;

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
Route::middleware('api')->resource('decks.questions', DeckQuestionController::class);

Route::middleware('api')->resource('questions', QuestionController::class);
Route::middleware('api')->resource('questions.answers', QuestionAnswerController::class);
Route::middleware('api')->resource('questions.images', QuestionImageController::class);

Route::middleware('api')->resource('images', ImageController::class);

Route::middleware('api')->resource('answers', AnswerController::class);

Route::middleware('api')->resource('news', NewsController::class);

Route::middleware('api')->resource('sessions', ApiSessionController::class);
Route::middleware('api')->resource('sessions.answerchoices', ApiAnswerChoiceController::class);
