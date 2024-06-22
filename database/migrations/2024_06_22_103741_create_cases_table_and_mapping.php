<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cases', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('text', 4000);

            $table->bigInteger('legacy_case_id')->unsigned()->nullable();
        });

        Schema::table('questions', function (Blueprint $table) {
            $table->bigInteger('case_id')->unsigned()->nullable();
        });

        Schema::create('deck_case', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->bigInteger('deck_id')->unsigned();
            $table->foreign('deck_id')->references('id')->on('decks')->onDelete('cascade');

            $table->bigInteger('case_id')->unsigned();
            $table->foreign('case_id')->references('id')->on('cases');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cases');
    }
};
