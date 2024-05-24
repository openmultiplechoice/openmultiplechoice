<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['text', 'hint', 'comment', 'correct_answer_id', 'type', 'is_invalid', 'needs_review'];

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    public function decks()
    {
        return $this->belongsToMany(Deck::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    // Images should be soft deleted, hence we can't just cascade
    // on delete but need this custom handler.
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($question) {
            $question->images()->delete();
        });
    }
}
