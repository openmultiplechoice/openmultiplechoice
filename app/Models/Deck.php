<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deck extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'exam_at', 'questions', 'module_id', 'is_archived'];

    protected $casts = [
        'exam_at' => 'datetime:Y-m-d',
    ];

    public function questions()
    {
        return $this->belongsToMany(Question::class);
    }

    public function sessions()
    {
        return $this->hasMany(Session::class);
    }

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function submission()
    {
        return $this->hasOne(DeckSubmission::class);
    }

    public function parentSession()
    {
        return $this->belongsTo(Session::class, 'parent_session_id');
    }
}
