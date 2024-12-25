<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\SubjectController;

use App\Http\Controllers\Api\ModuleController;

use App\Http\Controllers\Api\DeckController;
use App\Http\Controllers\Api\DeckCaseController;
use App\Http\Controllers\Api\DeckQuestionController;
use App\Http\Controllers\Api\DeckBookmarkController;

use App\Http\Controllers\Api\CaseController;

use App\Http\Controllers\Api\QuestionController;
use App\Http\Controllers\Api\QuestionAnswerController;
use App\Http\Controllers\Api\QuestionImageController;
use App\Http\Controllers\Api\QuestionMessageController;

use App\Http\Controllers\Api\ImageController;

use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\MessageThumbController;

use App\Http\Controllers\Api\AnswerController;
use App\Http\Controllers\Api\AnswerChoiceController;

use App\Http\Controllers\Api\SessionController;

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\UserSettingsController;

use App\Http\Controllers\Api\StatsController;

use App\Http\Controllers\Api\MagicGifController;

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
    Route::get('subjects/byname', [SubjectController::class, 'showByName']);
    Route::resource('subjects', SubjectController::class);

    Route::get('modules/byname', [ModuleController::class, 'showByName']);
    Route::resource('modules', ModuleController::class);

    Route::get('decks/withquestionids', [DeckController::class, 'indexWithQuestionIds']);
    Route::post('decks/{deck}/addquestion', [DeckController::class, 'addQuestionById']);
    Route::post('decks/{deck}/removequestion', [DeckController::class, 'removeQuestionById']);
    Route::resource('decks', DeckController::class);
    Route::resource('decks.cases', DeckCaseController::class);
    Route::resource('decks.questions', DeckQuestionController::class);
    Route::resource('decks.bookmark', DeckBookmarkController::class);

    Route::get('cases/showbylegacyid', [CaseController::class, 'showByLegacyId']);
    Route::resource('cases', CaseController::class);

    Route::get('questions/showbylegacyid', [QuestionController::class, 'showByLegacyId']);
    Route::resource('questions', QuestionController::class);
    Route::resource('questions.answers', QuestionAnswerController::class);
    Route::resource('questions.images', QuestionImageController::class);
    Route::resource('questions.messages', QuestionMessageController::class);

    Route::resource('images', ImageController::class);

    Route::resource('messages', MessageController::class);
    Route::resource('messages.thumbs', MessageThumbController::class);

    Route::resource('answers', AnswerController::class);

    Route::resource('sessions', SessionController::class);
    Route::post('sessions/newfromquestionids', [SessionController::class, 'newFromQuestionIds']);
    Route::resource('sessions.answerchoices', AnswerChoiceController::class);
    Route::post('sessions/{session}/newfromincorrect', [SessionController::class, 'newFromIncorrect']);

    Route::get('users/me/settings', [UserSettingsController::class, 'show']);
    Route::put('users/me/settings', [UserSettingsController::class, 'update']);

    Route::get('users/showbylegacyid', [UserController::class, 'showByLegacyId']);
    Route::resource('users', UserController::class);

    Route::get('stats/activity', [StatsController::class, 'activity']);

    if (config('app.magic')) {
        Route::get('magic-gif', [MagicGifController::class, 'show']);
    }
});
