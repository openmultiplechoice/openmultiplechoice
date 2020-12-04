<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDeckQuestionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deck_question', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->bigInteger('deck_id')->unsigned();
            $table->foreign('deck_id')->references('id')->on('decks');

            $table->bigInteger('question_id')->unsigned();
            $table->foreign('question_id')->references('id')->on('questions');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('deck_question');
    }
}
