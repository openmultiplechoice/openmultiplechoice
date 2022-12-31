<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\SubjectController;

use App\Http\Controllers\Api\ModuleController;

use App\Http\Controllers\Api\DeckController;
use App\Http\Controllers\Api\DeckQuestionController;

use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\QuestionAnswerController;
use App\Http\Controllers\Api\QuestionImageController;
use App\Http\Controllers\Api\QuestionMessageController;

use App\Http\Controllers\Api\ImageController;

use App\Http\Controllers\Api\MessageController;

use App\Http\Controllers\Api\AnswerController;
use App\Http\Controllers\Api\AnswerChoiceController;

use App\Http\Controllers\Api\SessionController;

use App\Http\Controllers\Api\UserSettingsController;

use App\Http\Controllers\Api\StatsController;

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

Route::group(['middleware' => ['api', 'auth:sanctum']], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('subjects/byname/{name}', [SubjectController::class, 'showByName']);
    Route::resource('subjects', SubjectController::class);

    Route::get('modules/byname/{name}', [ModuleController::class, 'showByName']);
    Route::resource('modules', ModuleController::class);

    Route::get('decks/withquestionids', [DeckController::class, 'indexWithQuestionIds']);
    Route::post('decks/{deck}/addquestion', [DeckController::class, 'addQuestionById']);
    Route::post('decks/{deck}/removequestion', [DeckController::class, 'removeQuestionById']);
    Route::resource('decks', DeckController::class);
    Route::resource('decks.questions', DeckQuestionController::class);

    Route::resource('questions', QuestionController::class);
    Route::resource('questions.answers', QuestionAnswerController::class);
    Route::resource('questions.images', QuestionImageController::class);
    Route::resource('questions.messages', QuestionMessageController::class);

    Route::resource('images', ImageController::class);

    Route::resource('messages', MessageController::class);

    Route::resource('answers', AnswerController::class);

    Route::resource('sessions', SessionController::class);
    Route::resource('sessions.answerchoices', AnswerChoiceController::class);

    Route::resource('users/me/settings', UserSettingsController::class);

    Route::resource('stats', StatsController::class);
});
