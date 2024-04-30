<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminSettingsSignup extends Model
{
    protected $table = 'admin_settings_signup';

    protected $fillable = [
        'settings',
    ];

    protected $casts = [
        'settings' => 'array',
    ];
}
