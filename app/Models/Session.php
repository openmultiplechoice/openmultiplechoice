<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'current_question_id',
    ];

    public function deck()
    {
        return $this->belongsTo(Deck::class);
    }

    public function answerChoices()
    {
        return $this->hasMany(AnswerChoice::class);
    }

    public function parentSession()
    {
        return $this->belongsTo(Session::class, 'parent_session_id');
    }
}
