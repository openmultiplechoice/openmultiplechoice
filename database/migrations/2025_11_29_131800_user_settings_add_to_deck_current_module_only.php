<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('user_settings', function (Blueprint $table) {
            $table->boolean('add_to_deck_current_module_only')->default(true);
        });
    }

    public function down(): void
    {
        Schema::table('user_settings', function (Blueprint $table) {
        });
    }
};
