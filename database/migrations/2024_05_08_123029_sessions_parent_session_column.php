<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('sessions', function (Blueprint $table) {
            $table->bigInteger('parent_session_id')->unsigned()->nullable();
            $table->foreign('parent_session_id')->references('id')->on('sessions');
        });
    }

    public function down(): void
    {
        Schema::table('', function (Blueprint $table) {
            //
        });
    }
};
