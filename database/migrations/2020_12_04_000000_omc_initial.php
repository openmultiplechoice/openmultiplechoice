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
            $table->string('text', 1000);

            $table->bigInteger('correct_answer_id')->unsigned()->nullable();
        });

        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('text', 1000);

            $table->bigInteger('question_id')->unsigned();
            $table->foreign('question_id')->references('id')->on('questions');
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
            $table->foreign('deck_id')->references('id')->on('decks');

            $table->bigInteger('current_question_id')->unsigned()->nullable();
            $table->foreign('current_question_id')->references('id')->on('questions');
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
            $table->foreign('question_id')->references('id')->on('questions');

            $table->bigInteger('answer_id')->unsigned();
            $table->foreign('answer_id')->references('id')->on('answers');

            $table->bigInteger('session_id')->unsigned();
            $table->foreign('session_id')->references('id')->on('sessions');
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
    }
}
