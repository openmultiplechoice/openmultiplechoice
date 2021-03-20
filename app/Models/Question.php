<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['text', 'answers'];

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
}
