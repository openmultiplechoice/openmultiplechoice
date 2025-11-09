<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Deck extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'description', 'exam_at', 'questions', 'module_id', 'is_archived'];

    protected $casts = [
        'exam_at' => 'datetime:Y-m-d',
    ];

    public function questions()
    {
        return $this->belongsToMany(Question::class)
                    ->orderByPivot('id');
    }

    public function cases()
    {
        return $this->belongsToMany(QuestionCase::class, 'deck_case', 'deck_id', 'case_id');
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

    public function bookmarks()
    {
        return $this->belongsToMany(User::class, 'deck_bookmark')->withTimestamps();
    }

    public function bookmarked()
    {
        return $this->bookmarks()->where('user_id', Auth::id())->exists();
    }

    public function isPublic()
    {
        return in_array($this->access, [
            'public-rw-listed',
            'public-rw',
            'public-ro',
        ]);
    }

    public function isOwnedBy(User $user)
    {
        return $this->user_id === $user->id;
    }

    /**
     * Scope a query to only include personal decks for a user.
     * Excludes ephemeral and archived decks.
     */
    #[Scope]
    protected function personalDecksBy(Builder $query, User $user): void
    {
        $query->where('user_id', $user->id)
            ->where('access', '!=', 'public-rw-listed')
            ->where('is_ephemeral', false)
            ->where('is_archived', false);
    }

    /**
     * Scope a query to only include decks that are bookmarked by the user
     * with public read-write access.
     */
    #[Scope]
    protected function bookmarkedAndWritableBy(Builder $query, User $user): void
    {
        $query->whereHas('bookmarks', function ($query) use ($user) {
            $query->where('user_id', '=', $user->id)
                ->where('access', '=', 'public-rw');
        });
    }
}
