<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'add_to_deck_current_module_only',
        'last_subject_id',
        'last_module_id',
        'last_new_session_deck_kind',
        'session_show_sidebar',
        'session_show_progress_bar',
        'session_exam_mode',
        'session_shuffle_answers',
        'session_multiple_answer_tries',
        'session_show_answer_stats',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
