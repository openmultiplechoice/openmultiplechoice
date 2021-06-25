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
        Schema::create('decks', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name', 500);
            $table->boolean('official')->default(false);
        });

        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('text', 2000)->nullable();
            $table->string('hint', 1000)->nullable();

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
        });

        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title', 200);
            $table->text('text');
            $table->string('level', 100)->default('');
            $table->boolean('sticky')->default(false);
        });

        Schema::create('answer_choices', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->bigInteger('question_id')->unsigned();
            $table->foreign('question_id')->references('id')->on('questions')->onDelete('cascade');

            // nullable to allow us to signify when the user pressed
            // the "show answer" button
            $table->bigInteger('answer_id')->unsigned()->nullable();
            $table->foreign('answer_id')->references('id')->on('answers')->onDelete('cascade');

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

            $table->bigInteger('author_id')->unsigned();
            $table->foreign('author_id')->references('id')->on('users');

            $table->bigInteger('parent_message_id')->unsigned()->nullable();
            $table->foreign('parent_message_id')->references('id')->on('messages');
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
        Schema::dropIfExists('decks');
        Schema::dropIfExists('messages');
    }
}
