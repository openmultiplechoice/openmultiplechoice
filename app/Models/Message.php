<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = ['text', 'question_id', 'parent_message_id', 'legacy_message_id', 'legacy_parent_message_id', 'legacy_author_name'];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class);
    }
}
