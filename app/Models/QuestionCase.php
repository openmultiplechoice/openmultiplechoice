<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionCase extends Model
{
    use HasFactory;

    // The name "Case" is reserved by PHP, hence we use "QuestionCase"
    // as the class name and define the table name explicitly.
    protected $table = 'cases';

    protected $fillable = ['text'];

    public function decks()
    {
        return $this->belongsToMany(Deck::class, 'deck_case', 'case_id', 'deck_id');
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'case_id');
    }
}
