<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class () extends Migration {
    public function up()
    {
        Schema::table('answers', function (Blueprint $table) {
            $table->index('question_id', 'idx_answers_question_id');
        });

        Schema::table('answer_choices', function (Blueprint $table) {
            $table->index('answer_id', 'idx_answer_choices_answer_id');
            $table->index('question_id', 'idx_answer_choices_question_id');
        });
    }

    public function down()
    {
        Schema::table('answers', function (Blueprint $table) {
            $table->dropIndex('idx_answers_question_id');
        });

        Schema::table('answer_choices', function (Blueprint $table) {
            $table->dropIndex('idx_answer_choices_answer_id');
            $table->dropIndex('idx_answer_choices_question_id');
        });
    }
};
