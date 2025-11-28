<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('user_settings', function (Blueprint $table) {
            $table->string('last_new_session_deck_kind', 255)->default('public-rw-listed');
        });
    }

    public function down(): void
    {
        Schema::table('user_settings', function (Blueprint $table) {
        });
    }
};
