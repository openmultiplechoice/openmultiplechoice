<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\AnswerChoice;
use App\Models\Question;
use App\Models\Session;
use App\Models\User;
use App\Models\Deck;
use App\Models\Module;

class ApiAnswerChoiceLatestByQuestionIdTest extends TestCase
{
    use RefreshDatabase;

    public function testLatestAnswersReturnsEmptyArrayIfNoQuestionIdsProvided(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->postJson('/api/answerchoices/latest_by_question_id', ['question_ids' => []])
            ->assertOk()
            ->assertJson(['answer_choices' => []]);
    }

    public function testLatestAnswersReturnsOnlyLatestAnswerForRequestedQuestions(): void
    {
        $userA = User::factory()->create();
        $userB = User::factory()->create();

        $questionA = Question::factory()->create(['is_invalid' => false]);
        $questionB = Question::factory()->create(['is_invalid' => false]);
        $questionC = Question::factory()->create(['is_invalid' => false]);

        $module = Module::factory()->create();
        $deck = Deck::factory()->create(['module_id' => $module->id, 'user_id' => $userA->id, 'access' => 'private']);

        $olderSessionA = Session::factory()->create(['user_id' => $userA->id, 'name' => 'Session 1', 'deck_id' => $deck->id]);
        $newerSessionA = Session::factory()->create(['user_id' => $userA->id, 'name' => 'Session 2', 'deck_id' => $deck->id]);

        $sessionB = Session::factory()->create(['user_id' => $userB->id, 'name' => 'Session B', 'deck_id' => $deck->id]);

        // Older answer for user A, question A
        AnswerChoice::factory()->create([
            'session_id' => $olderSessionA->id,
            'question_id' => $questionA->id,
            'is_correct' => false,
            'help_used' => false,
        ]);

        // Newer answer for user A, question A
        AnswerChoice::factory()->create([
            'session_id' => $newerSessionA->id,
            'question_id' => $questionA->id,
            'is_correct' => true,
            'help_used' => true,
        ]);

        // Answer for user A, question B
        AnswerChoice::factory()->create([
            'session_id' => $olderSessionA->id,
            'question_id' => $questionB->id,
            'is_correct' => false,
            'help_used' => false,
        ]);

        // Answer for user B, question A (should not be returned for user A)
        AnswerChoice::factory()->create([
            'session_id' => $sessionB->id,
            'question_id' => $questionA->id,
            'is_correct' => false,
            'help_used' => false,
        ]);

        $this->actingAs($userA)
            ->postJson('/api/answerchoices/latest_by_question_id', [
                'question_ids' => [$questionA->id, $questionB->id, $questionC->id],
            ])
            ->assertOk()
            ->assertJsonCount(2, 'answer_choices')
            ->assertJsonFragment([
                'question_id' => $questionA->id,
                'is_correct' => 1,
                'help_used' => 1,
            ])
            ->assertJsonFragment([
                'question_id' => $questionB->id,
                'is_correct' => 0,
                'help_used' => 0,
            ])
            ->assertJsonMissing([
                'question_id' => $questionC->id,
            ]);
    }
}
