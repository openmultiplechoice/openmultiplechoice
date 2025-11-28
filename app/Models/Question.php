<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['text', 'hint', 'comment', 'correct_answer_id', 'type', 'is_invalid', 'needs_review', 'case_id'];

    public function answers()
    {
        return $this->hasMany(Answer::class)->orderBy('id', 'asc');
    }

    public function decks()
    {
        return $this->belongsToMany(Deck::class);
    }

    public function case()
    {
        return $this->belongsTo(QuestionCase::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function answer_choices()
    {
        return $this->hasMany(AnswerChoice::class);
    }

    // Images should be soft deleted, hence we can't just cascade
    // on delete but need this custom handler.
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($question) {
            $question->images()->delete();
        });
    }

    public static function getAddToDeckCountForUser(Collection|array $questionIds, User $user): array
    {
        $questionIds = collect($questionIds);

        $personalDeckCounts = DB::table('deck_question')
            ->select('question_id', DB::raw('COUNT(DISTINCT deck_id) as count'))
            ->join('decks', 'deck_question.deck_id', '=', 'decks.id')
            ->whereIn('deck_question.question_id', $questionIds)
            ->where('decks.user_id', $user->id)
            ->where('decks.access', '!=', 'public-rw-listed')
            ->where('decks.is_ephemeral', false)
            ->where('decks.is_archived', false)
            ->groupBy('question_id')
            ->pluck('count', 'question_id');

        $bookmarkedDeckCounts = DB::table('deck_question')
            ->select('question_id', DB::raw('COUNT(DISTINCT deck_question.deck_id) as count'))
            ->join('decks', 'deck_question.deck_id', '=', 'decks.id')
            ->join('deck_bookmark', 'decks.id', '=', 'deck_bookmark.deck_id')
            ->whereIn('deck_question.question_id', $questionIds)
            ->where('deck_bookmark.user_id', $user->id)
            ->where('decks.access', 'public-rw')
            ->where('decks.user_id', '!=', $user->id)
            ->groupBy('question_id')
            ->pluck('count', 'question_id');

        $counts = [];
        foreach ($questionIds as $questionId) {
            $counts[$questionId] = ($personalDeckCounts[$questionId] ?? 0) + ($bookmarkedDeckCounts[$questionId] ?? 0);
        }

        return $counts;
    }
}
