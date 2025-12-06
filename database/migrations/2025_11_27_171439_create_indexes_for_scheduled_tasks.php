<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Indexes to optimize scheduled tasks in app/Console/Kernel.php:
     * - updateActivityStats: Aggregates answer_choices by hour
     * - updateDeckStats: Finds popular and recently used decks
     */
    public function up(): void
    {
        Schema::table('answer_choices', function (Blueprint $table) {
            $table->index('created_at', 'idx_answer_choices_created_at');
        });

        Schema::table('sessions', function (Blueprint $table) {
            $table->index(['deck_id', 'created_at'], 'idx_sessions_deck_created');
            $table->index('created_at', 'idx_sessions_created_at');
        });
    }

    public function down(): void
    {
        Schema::table('answer_choices', function (Blueprint $table) {
            $table->dropIndex('idx_answer_choices_created_at');
        });

        Schema::table('sessions', function (Blueprint $table) {
            $table->dropIndex('idx_sessions_deck_created');
            $table->dropIndex('idx_sessions_created_at');
        });
    }
};
