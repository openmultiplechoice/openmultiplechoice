<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\Deck;
use App\Models\User;

class ApiDeckQuestionTest extends TestCase
{
    use RefreshDatabase;

    protected $userA;
    protected $userB;
    protected $admin;

    protected $deckPublicRw;
    protected $deckPublicRo;
    protected $deckPrivate;

    protected function setUp(): void
    {
        parent::setUp();

        $this->userA = User::factory()->create();
        $this->userB = User::factory()->create();
        $this->admin = User::factory()->create(['is_admin' => true]);

        $this->deckPublicRw = Deck::factory()->create([
            'access' => 'public-rw',
            'user_id' => $this->userA->id,
        ]);

        $this->deckPublicRo = Deck::factory()->create([
            'access' => 'public-ro',
            'user_id' => $this->userA->id,
        ]);

        $this->deckPrivate = Deck::factory()->create([
            'access' => 'private',
            'user_id' => $this->userA->id,
        ]);
    }

    public function testStoreQuestionOnPublicRwDeck(): void
    {
        $questionData = [
            'text' => 'What is the capital of France?',
            'type' => 'mc',
            'answers' => [
                ['text' => 'Paris', 'is_correct' => true],
                ['text' => 'London', 'is_correct' => false],
                ['text' => 'Berlin', 'is_correct' => false],
            ],
        ];

        // UserA (owner) can add question
        $response = $this->actingAs($this->userA)
            ->postJson("/api/decks/{$this->deckPublicRw->id}/questions", $questionData);

        $response->assertStatus(200)
            ->assertJsonPath('text', 'What is the capital of France?')
            ->assertJsonPath('type', 'mc')
            ->assertJsonCount(3, 'answers')
            // Verify answers array structure has required keys
            ->assertJsonStructure([
                'id',
                'text',
                'type',
                'correct_answer_id',
                'answers' => [
                    '*' => ['id', 'text', 'question_id'],
                ],
            ])
            // Verify answer content
            ->assertJsonPath('answers.0.text', 'Paris')
            ->assertJsonPath('answers.1.text', 'London')
            ->assertJsonPath('answers.2.text', 'Berlin');

        $this->assertDatabaseHas('questions', ['text' => 'What is the capital of France?']);
        $this->assertDatabaseHas('answers', ['text' => 'Paris']);
        $this->assertDatabaseHas('answers', ['text' => 'London']);
        $this->assertDatabaseHas('answers', ['text' => 'Berlin']);

        // Verify the question is linked to the deck
        $this->deckPublicRw->refresh();
        $this->assertEquals(1, $this->deckPublicRw->questions()->count());

        // UserB can also add to public-rw deck
        $questionData2 = [
            'text' => 'What is 2+2?',
            'type' => 'mc',
            'answers' => [
                ['text' => '4', 'is_correct' => true],
                ['text' => '5', 'is_correct' => false],
            ],
        ];

        $response = $this->actingAs($this->userB)
            ->postJson("/api/decks/{$this->deckPublicRw->id}/questions", $questionData2);

        $response->assertStatus(200);
        $this->deckPublicRw->refresh();
        $this->assertEquals(2, $this->deckPublicRw->questions()->count());
    }

    public function testStoreQuestionOnPublicRoDeck(): void
    {
        $questionData = [
            'text' => 'Test question',
            'type' => 'mc',
            'answers' => [
                ['text' => 'Answer 1', 'is_correct' => true],
                ['text' => 'Answer 2', 'is_correct' => false],
            ],
        ];

        // Owner can add question to public-ro deck
        $response = $this->actingAs($this->userA)
            ->postJson("/api/decks/{$this->deckPublicRo->id}/questions", $questionData);

        $response->assertStatus(200);

        // UserB cannot add question to public-ro deck
        $questionData['text'] = 'Another question';
        $response = $this->actingAs($this->userB)
            ->postJson("/api/decks/{$this->deckPublicRo->id}/questions", $questionData);

        $response->assertStatus(403);

        // Admin can add question to public-ro deck
        $questionData['text'] = 'Admin question';
        $response = $this->actingAs($this->admin)
            ->postJson("/api/decks/{$this->deckPublicRo->id}/questions", $questionData);

        $response->assertStatus(200);
    }

    public function testStoreQuestionOnPrivateDeck(): void
    {
        $questionData = [
            'text' => 'Private question',
            'type' => 'mc',
            'answers' => [
                ['text' => 'Answer 1', 'is_correct' => true],
                ['text' => 'Answer 2', 'is_correct' => false],
            ],
        ];

        // Owner can add question to private deck
        $response = $this->actingAs($this->userA)
            ->postJson("/api/decks/{$this->deckPrivate->id}/questions", $questionData);

        $response->assertStatus(200);

        // UserB cannot add question to private deck (404 - deck not found)
        $questionData['text'] = 'Another question';
        $response = $this->actingAs($this->userB)
            ->postJson("/api/decks/{$this->deckPrivate->id}/questions", $questionData);

        $response->assertStatus(404);

        // Admin can add question to private deck
        $questionData['text'] = 'Admin question';
        $response = $this->actingAs($this->admin)
            ->postJson("/api/decks/{$this->deckPrivate->id}/questions", $questionData);

        $response->assertStatus(200);
    }

    public function testStoreQuestionValidation(): void
    {
        // Type is required
        $response = $this->actingAs($this->userA)
            ->postJson("/api/decks/{$this->deckPublicRw->id}/questions", [
                'text' => 'Test question',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['type']);

        // Type must be 'mc' or 'card'
        $response = $this->actingAs($this->userA)
            ->postJson("/api/decks/{$this->deckPublicRw->id}/questions", [
                'text' => 'Test question',
                'type' => 'invalid',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['type']);
    }

    public function testStoreQuestionRejectsMultipleCorrectAnswers(): void
    {
        // Multiple correct answers should be rejected
        $response = $this->actingAs($this->userA)
            ->postJson("/api/decks/{$this->deckPublicRw->id}/questions", [
                'text' => 'Test question',
                'type' => 'mc',
                'answers' => [
                    ['text' => 'Answer 1', 'is_correct' => true],
                    ['text' => 'Answer 2', 'is_correct' => true],
                ],
            ]);

        $response->assertStatus(422)
            ->assertJsonPath('message', 'Only one answer can be marked as correct');
    }

    public function testStoreQuestionAllowsNoCorrectAnswer(): void
    {
        // No correct answer is allowed (all wrong answers)
        $response = $this->actingAs($this->userA)
            ->postJson("/api/decks/{$this->deckPublicRw->id}/questions", [
                'text' => 'Test question with no correct answer',
                'type' => 'mc',
                'answers' => [
                    ['text' => 'Answer 1', 'is_correct' => false],
                    ['text' => 'Answer 2', 'is_correct' => false],
                ],
            ]);

        $response->assertStatus(200)
            ->assertJsonPath('text', 'Test question with no correct answer')
            ->assertJsonCount(2, 'answers')
            // Verify correct_answer_id is null in response
            ->assertJsonPath('correct_answer_id', null);
    }

    public function testStoreQuestionWithOptionalFields(): void
    {
        $questionData = [
            'text' => 'Question with all fields',
            'hint' => 'This is a hint',
            'comment' => 'This is a comment',
            'type' => 'mc',
            'is_invalid' => true,
            'needs_review' => true,
            'answers' => [
                ['text' => 'Answer 1', 'hint' => 'Answer hint 1', 'is_correct' => true],
                ['text' => 'Answer 2', 'hint' => 'Answer hint 2', 'is_correct' => false],
            ],
        ];

        $response = $this->actingAs($this->userA)
            ->postJson("/api/decks/{$this->deckPublicRw->id}/questions", $questionData);

        $response->assertStatus(200)
            ->assertJsonPath('text', 'Question with all fields')
            ->assertJsonPath('hint', 'This is a hint')
            ->assertJsonPath('comment', 'This is a comment')
            ->assertJsonPath('is_invalid', true)
            ->assertJsonPath('needs_review', true)
            // Verify answers structure includes hint
            ->assertJsonStructure([
                'answers' => [
                    '*' => ['id', 'text', 'hint', 'question_id'],
                ],
            ])
            ->assertJsonPath('answers.0.text', 'Answer 1')
            ->assertJsonPath('answers.0.hint', 'Answer hint 1')
            ->assertJsonPath('answers.1.text', 'Answer 2')
            ->assertJsonPath('answers.1.hint', 'Answer hint 2');

        $this->assertDatabaseHas('answers', [
            'text' => 'Answer 1',
            'hint' => 'Answer hint 1',
        ]);
    }

    public function testStoreCardTypeQuestion(): void
    {
        $questionData = [
            'text' => 'Card question',
            'type' => 'card',
        ];

        $response = $this->actingAs($this->userA)
            ->postJson("/api/decks/{$this->deckPublicRw->id}/questions", $questionData);

        $response->assertStatus(200)
            ->assertJsonPath('text', 'Card question')
            ->assertJsonPath('type', 'card');
    }

    public function testStoreQuestionSetsCorrectAnswerId(): void
    {
        $questionData = [
            'text' => 'Question to verify correct_answer_id',
            'type' => 'mc',
            'answers' => [
                ['text' => 'Wrong answer', 'is_correct' => false],
                ['text' => 'Correct answer', 'is_correct' => true],
                ['text' => 'Another wrong', 'is_correct' => false],
            ],
        ];

        $response = $this->actingAs($this->userA)
            ->postJson("/api/decks/{$this->deckPublicRw->id}/questions", $questionData);

        $response->assertStatus(200);

        // Verify correct_answer_id is set correctly using API response
        $responseData = $response->json();
        $correctAnswer = collect($responseData['answers'])->firstWhere('text', 'Correct answer');

        $this->assertNotNull($responseData['correct_answer_id']);
        $this->assertEquals($correctAnswer['id'], $responseData['correct_answer_id']);
    }

    public function testStoreQuestionWithLegacyId(): void
    {
        $questionData = [
            'text' => 'Legacy question',
            'type' => 'mc',
            'legacy_question_id' => 12345,
            'answers' => [
                ['text' => 'Answer', 'is_correct' => true],
            ],
        ];

        $response = $this->actingAs($this->userA)
            ->postJson("/api/decks/{$this->deckPublicRw->id}/questions", $questionData);

        $response->assertStatus(200);

        $this->assertDatabaseHas('questions', [
            'text' => 'Legacy question',
            'legacy_question_id' => 12345,
        ]);
    }
}
