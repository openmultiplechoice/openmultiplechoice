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


    /**
     * This function anonymizes the thumbs of the message to include them in a response.
     * It replaces the user_id of the thumb with null if the user is not the author of the thumb.
     * If the user is the author of the thumb, it includes the user_id in the response.
     */
    public function thumbsAnonymized()
    {
        $thumbs = [];
        foreach ($this->thumbs as $thumb) {
            if ($thumb->user_id == Auth::id()) {
                $thumbs[] = ["thumb" => $thumb->type, "user_id" => $thumb->user_id, "id" => $thumb->id];
            } else {
                $thumbs[] = ["thumb" => $thumb->type, "id" => $thumb->id];
            }
        }
        // Unset the original thumbs (to not include them in the response) and set the anonymized thumbs
        unset($this->thumbs);
        $this->thumbs = $thumbs;
        return $this;
    }
}
