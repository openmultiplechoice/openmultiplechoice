<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::create('registration_tokens', function (Blueprint $table) {
            $table->id();
            $table->timestamps();

            $table->string('token');
            $table->timestamp('expires_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('registration_tokens');
    }
};
