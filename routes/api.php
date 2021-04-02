<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\DeckQuestionController;

use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\QuestionAnswerController;
use App\Http\Controllers\Api\QuestionImageController;

use App\Http\Controllers\Api\ImageController;

use App\Http\Controllers\Api\AnswerController;
use App\Http\Controllers\Api\AnswerChoiceController;

use App\Http\Controllers\Api\SessionController;

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

Route::middleware('api')->resource('decks.questions', DeckQuestionController::class);

Route::middleware('api')->resource('questions', QuestionController::class);
Route::middleware('api')->resource('questions.answers', QuestionAnswerController::class);
Route::middleware('api')->resource('questions.images', QuestionImageController::class);

Route::middleware('api')->resource('images', ImageController::class);

Route::middleware('api')->resource('answers', AnswerController::class);

Route::middleware('api')->resource('sessions', SessionController::class);
Route::middleware('api')->resource('sessions.answerchoices', AnswerChoiceController::class);
