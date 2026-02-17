<?php

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ApiSubjectController;

use App\Http\Controllers\ApiModuleController;

use App\Http\Controllers\ApiDeckController;
use App\Http\Controllers\ApiDeckCaseController;
use App\Http\Controllers\ApiDeckQuestionController;
use App\Http\Controllers\ApiDeckBookmarkController;

use App\Http\Controllers\ApiCaseController;

use App\Http\Controllers\ApiQuestionController;
use App\Http\Controllers\ApiQuestionAnswerController;
use App\Http\Controllers\ApiQuestionImageController;
use App\Http\Controllers\ApiQuestionMessageController;

use App\Http\Controllers\ApiImageController;

use App\Http\Controllers\ApiMessageController;
use App\Http\Controllers\ApiMessageThumbController;

use App\Http\Controllers\ApiAnswerController;
use App\Http\Controllers\ApiAnswerChoiceController;

use App\Http\Controllers\ApiSessionController;

use App\Http\Controllers\ApiUserController;
use App\Http\Controllers\ApiUserSettingsController;

use App\Http\Controllers\ApiStatsController;

use App\Http\Controllers\ApiMagicGifController;

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

Route::group(['middleware' => ['api', 'auth:sanctum'], 'as' => 'api.'], function () {
    Route::get('subjects/byname', [ApiSubjectController::class, 'showByName']);
    Route::resource('subjects', ApiSubjectController::class);

    Route::get('modules/byname', [ApiModuleController::class, 'showByName']);
    Route::resource('modules', ApiModuleController::class);

    Route::get('decks/withquestionids', [ApiDeckController::class, 'indexWithQuestionIds']);
    Route::post('decks/{deck}/addquestion', [ApiDeckController::class, 'addQuestionById']);
    Route::post('decks/{deck}/removequestion', [ApiDeckController::class, 'removeQuestionById']);
    Route::resource('decks', ApiDeckController::class);
    Route::resource('decks.cases', ApiDeckCaseController::class);
    Route::resource('decks.questions', ApiDeckQuestionController::class);
    Route::resource('decks.bookmark', ApiDeckBookmarkController::class);

    Route::get('cases/showbylegacyid', [ApiCaseController::class, 'showByLegacyId']);
    Route::resource('cases', ApiCaseController::class);

    Route::get('questions/showbylegacyid', [ApiQuestionController::class, 'showByLegacyId']);
    Route::resource('questions', ApiQuestionController::class);
    Route::resource('questions.answers', ApiQuestionAnswerController::class);
    Route::resource('questions.images', ApiQuestionImageController::class);
    Route::resource('questions.messages', ApiQuestionMessageController::class);

    Route::resource('images', ApiImageController::class);

    Route::resource('messages', ApiMessageController::class);
    Route::resource('messages.thumbs', ApiMessageThumbController::class);

    Route::resource('answers', ApiAnswerController::class);

    Route::resource('sessions', ApiSessionController::class);
    Route::post('sessions/newfromquestionids', [ApiSessionController::class, 'newFromQuestionIds']);
    Route::resource('sessions.answerchoices', ApiAnswerChoiceController::class);
    Route::post('sessions/{session}/newfromincorrect', [ApiSessionController::class, 'newFromIncorrect']);

    Route::get('users/me/settings', [ApiUserSettingsController::class, 'show']);
    Route::put('users/me/settings', [ApiUserSettingsController::class, 'update']);

    Route::get('users/showbylegacyid', [ApiUserController::class, 'showByLegacyId']);
    Route::resource('users', ApiUserController::class);

    Route::get('stats/activity', [ApiStatsController::class, 'activity']);

    if (config('app.magic')) {
        Route::get('magic-gif', [ApiMagicGifController::class, 'show']);
    }
});
