<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSettings extends Model
{
    use HasFactory;

    protected $fillable = ['last_subject_id', 'last_module_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
