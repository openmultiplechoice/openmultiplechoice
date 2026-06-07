<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up(): void
    {
        Schema::table('deck_question', function (Blueprint $table) {
            $table->index(['deck_id', 'id'], 'idx_dq_deck_order');
            $table->index(['question_id', 'deck_id'], 'idx_dq_question_deck');
        });

        Schema::table('deck_bookmark', function (Blueprint $table) {
            $table->index(['user_id', 'deck_id'], 'idx_dbm_user_deck');
        });

        Schema::table('decks', function (Blueprint $table) {
            $table->index(
                ['module_id', 'is_archived', 'is_ephemeral', 'access', 'exam_at', 'id'],
                'idx_decks_module_access_order'
            );
        });
    }

    public function down(): void
    {
        Schema::table('decks', function (Blueprint $table) {
            $table->dropIndex('idx_decks_module_access_order');
        });

        Schema::table('deck_bookmark', function (Blueprint $table) {
            $table->dropIndex('idx_dbm_user_deck');
        });

        Schema::table('deck_question', function (Blueprint $table) {
            $table->dropIndex('idx_dq_question_deck');
            $table->dropIndex('idx_dq_deck_order');
        });
    }
};
