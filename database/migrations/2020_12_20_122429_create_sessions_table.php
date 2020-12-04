<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSessionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
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
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sessions');
    }
}
