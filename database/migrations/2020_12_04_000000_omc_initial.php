<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class OmcInitial extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 500)->unique();
        });

        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 500)->unique();

            $table->bigInteger('subject_id')->unsigned()->nullable();
            $table->foreign('subject_id')->references('id')->on('subjects');
        });

        Schema::create('decks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 500);
            $table->boolean('official')->default(false);

            $table->bigInteger('module_id')->unsigned()->nullable();
            $table->foreign('module_id')->references('id')->on('modules');

            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('text', 2000)->nullable();
            $table->string('hint', 1000)->nullable();
            $table->string('type')->default('mc')->nullable();

            $table->bigInteger('correct_answer_id')->unsigned()->nullable();
        });

        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('text', 2000)->nullable();
            $table->string('hint', 1000)->nullable();

            $table->bigInteger('question_id')->unsigned();
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');
        });

        Schema::table('questions', function ($table) {
            $table->foreign('correct_answer_id')->references('id')->on('answers')->onDelete('set null');
        });

        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->softDeletes();
            $table->string('path', 250);
            $table->string('comment', 500)->nullable();

            $table->bigInteger('question_id')->unsigned()->nullable();
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('set null');
        });

        Schema::create('deck_question', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->bigInteger('deck_id')->unsigned();
            $table->foreign('deck_id')->references('id')->on('decks');

            $table->bigInteger('question_id')->unsigned();
            $table->foreign('question_id')->references('id')->on('questions');
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 500);
            $table->boolean('public')->default(false);

            $table->bigInteger('deck_id')->unsigned();
            $table->foreign('deck_id')->references('id')->on('decks')->onDelete('cascade');

            $table->bigInteger('current_question_id')->unsigned()->nullable();
            $table->foreign('current_question_id')->references('id')->on('questions')->onDelete('set null');

            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->foreign('user_id')->references('id')->on('users');
        });

        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title', 200);
            $table->text('text');
        });

        Schema::create('answer_choices', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            // Set to true for answers where the user decided to click
            // "Show hint" before answering
            $table->boolean('help_used')->default(false);

            $table->bigInteger('question_id')->unsigned();
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');

            // nullable to allow us to signify when the user pressed
            // the "show answer" button
            $table->bigInteger('answer_id')->unsigned()->nullable();
            $table->foreign('answer_id')->references('id')->on('answers')->onDelete('cascade');

            $table->boolean('is_correct')->default(false);

            $table->bigInteger('session_id')->unsigned();
            $table->foreign('session_id')->references('id')->on('sessions')->onDelete('cascade');
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->text('text')->nullable();

            $table->bigInteger('question_id')->unsigned();
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');

            // TODO: consider what to do when author or parent messages
            // are removed?

            // nullable in order to be able to import messages / comments
            // from previous systems where author identity can't be
            // retained
            $table->bigInteger('author_id')->unsigned()->nullable();
            $table->foreign('author_id')->references('id')->on('users');

            $table->bigInteger('parent_message_id')->unsigned()->nullable();
            $table->foreign('parent_message_id')->references('id')->on('messages');

            // Allow to preserve legacy message info for installations
            // where data is imported from a previous application.
            // Fields shouldn't be used for other use cases.
            $table->bigInteger('legacy_message_id')->unsigned()->nullable();
            $table->bigInteger('legacy_parent_message_id')->unsigned()->nullable();
            $table->string('legacy_author_name', 500)->nullable();
        });

        // Update the default users table
        Schema::table('users', function (Blueprint $table) {
            $table->boolean('is_admin')->default(false);
            $table->boolean('is_moderator')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('answer_choices');
        Schema::dropIfExists('news');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('deck_question');
        Schema::dropIfExists('questions');
        Schema::dropIfExists('answers');
        Schema::dropIfExists('modules');
        Schema::dropIfExists('decks');
        Schema::dropIfExists('messages');
    }
}
