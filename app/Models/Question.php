<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['text', 'hint', 'comment', 'correct_answer_id', 'type', 'is_invalid', 'needs_review', 'case_id'];

    public function answers()
    {
        return $this->hasMany(Answer::class)->orderBy('id', 'asc');
    }

    public function decks()
    {
        return $this->belongsToMany(Deck::class);
    }

    public function case()
    {
        return $this->belongsTo(QuestionCase::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function answer_choices()
    {
        return $this->hasMany(AnswerChoice::class);
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

    public function loadAddToDeckCount(User $user): void
    {
        $this->add_to_deck_included_count = $this->decks()
            ->where(function (Builder $query) use ($user) {
                $query->personalDecksBy($user)
                ->orWhere(function ($query) use ($user) {
                    $query->bookmarkedAndWritableBy($user);
                });
            })
            ->count();
    }
}
