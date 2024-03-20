<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Thumb extends Model
{
    use HasFactory;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * This Thumb model can belong to one of several other models that should be able to be up- or downvoted.
     * Right now this is only possible for the Message model.
     */
    public function thumbable(): MorphTo
    {
        return $this->morphTo();
    }
}
