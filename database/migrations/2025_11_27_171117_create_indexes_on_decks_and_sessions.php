<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    /**
     * Optimizes two frontend queries:
     * 1. Loading the latest sessions for a user
     * 2. Loading the user's decks in the AddToDeck component
     */
    public function up(): void
    {
        // Add an index for the sessions table to make
        // `... WHERE user_id = ? ORDER BY id DESC`
        // queries load faster
        Schema::table('sessions', function (Blueprint $table) {
            $table->index(['user_id', 'id'], 'idx_sessions_user_id');
        });

        // Add an index for the decks table to make for example
        // `... WHERE user_id = ? AND is_ephemeral = false AND is_archived = false ORDER BY id DESC`
        // queries load faster
        Schema::table('decks', function (Blueprint $table) {
            $table->index(['user_id', 'is_ephemeral', 'is_archived', 'id'], 'idx_decks_user_id');
        });
    }

    public function down(): void
    {
        Schema::table('sessions', function (Blueprint $table) {
            $table->dropIndex('idx_sessions_user_id');
        });

        Schema::table('decks', function (Blueprint $table) {
            $table->dropIndex('idx_decks_user_id');
        });
    }
};
