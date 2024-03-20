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
        Schema::create('thumbs', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            // A string that defines the type of the rating. Can be 'up' (for upvote) or 'down' (for downvote)
            $table->string('type', 10);

            $table->bigInteger('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            $table->morphs('thumbable');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('thumbs');
    }
};
