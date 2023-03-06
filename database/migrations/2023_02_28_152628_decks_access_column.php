<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('decks', function (Blueprint $table) {
            // A string that defines the "access" to the deck. Currently, the
            // following values are planned:
            //
            // * `public-ro`: anyone can access and use the deck, but only the
            //   owner can add/remove questions
            //
            // * `public-rw` anyone can access and use the deck, and anyone can
            //   add/remove questions
            //
            // * `public-rw-listed`: anyone can access and use the deck, anyone
            //   can add/remove questions and the deck appears in the public
            //   list of decks
            //
            // This might change in the future.
            $table->string('access', 100)->default('public-ro')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
};
