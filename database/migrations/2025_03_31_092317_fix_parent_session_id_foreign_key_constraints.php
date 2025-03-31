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
        Schema::table('decks', function (Blueprint $table) {
            $table->dropForeign(['parent_session_id']);
            $table->foreign('parent_session_id')->references('id')->on('sessions')->nullOnDelete();
        });
        Schema::table('sessions', function (Blueprint $table) {
            $table->dropForeign(['parent_session_id']);
            $table->foreign('parent_session_id')->references('id')->on('sessions')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sessions', function (Blueprint $table) {
            //
        });
    }
};
