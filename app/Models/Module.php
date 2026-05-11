<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'subject_id',
        'description',
    ];

    public function decks()
    {
        return $this->hasMany(Deck::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
