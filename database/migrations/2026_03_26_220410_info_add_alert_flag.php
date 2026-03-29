<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('info', function (Blueprint $table) {
            $table->boolean('is_alert')->default(false);
        });
    }

    public function down(): void
    {
        Schema::table('info', function (Blueprint $table) {
            $table->dropColumn('is_alert');
        });
    }
};
