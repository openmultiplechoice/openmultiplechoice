<?php

namespace App\Models;

use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail, CanResetPassword
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    protected static function booted()
    {
        static::created(function ($user) {
            $user->settings()->create();
        });
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%")
                ->orWhere('public_name', 'like', "%{$search}%")
                ->orWhere('email', 'like', "%{$search}%");
        });
    }

    public function hasPasswordSet(): bool
    {
        return !is_null($this->password);
    }

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'public_name',
        'email',
        'is_admin',
        'is_moderator',
        'is_enabled',
        'legacy_user_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'last_login_at' => 'datetime',
    ];

    public function messages()
    {
        return $this->hasMany(Message::class, 'author_id');
    }

    public function decks()
    {
        return $this->hasMany(Deck::class);
    }

    public function settings()
    {
        return $this->hasOne(UserSettings::class);
    }

    public function submissions()
    {
        return $this->hasMany(DeckSubmission::class);
    }

    public function message_ratings()
    {
        return $this->hasMany(Thumb::class);
    }

    public function bookmarkedDecks(): BelongsToMany
    {
        return $this->belongsToMany(Deck::class, 'deck_bookmark')
            ->where(function ($query) {
                $query->where('access', '!=', 'private')
                    ->orWhere('decks.user_id', $this->id);
            })
            ->withTimestamps();
    }
}
