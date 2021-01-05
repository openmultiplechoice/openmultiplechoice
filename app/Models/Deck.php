<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deck extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'questions', 'official'];

    public function questions()
    {
        return $this->belongsToMany(Question::class);
    }

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }
}
