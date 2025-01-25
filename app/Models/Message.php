<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Facades\Auth;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_at',
        'author_id',
        'text',
        'question_id',
        'parent_message_id',
        'legacy_message_id',
        'legacy_parent_message_id',
        'legacy_author_name',
        'is_anonymous',
        'is_deleted',
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function author()
    {
        return $this->belongsTo(User::class);
    }

    public function thumbs(): MorphMany
    {
        return $this->MorphMany(Thumb::class, 'thumbable');
    }
}
