<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = ['text', 'hint'];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    public function answer_choices()
    {
        return $this->hasMany(AnswerChoice::class);
    }
}
