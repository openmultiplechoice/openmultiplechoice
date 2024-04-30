<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('admin_settings_signup', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->json('settings');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('admin_settings');
    }
};
