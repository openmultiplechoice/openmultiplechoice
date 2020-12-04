<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    public function deck()
    {
        return $this->belongsTo(Deck::class);
    }

    public function answerChoices()
    {
        return $this->hasMany(AnswerChoice::class);
    }
}
