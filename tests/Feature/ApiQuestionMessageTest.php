<?php

namespace Tests\Feature;

use App\Models\Thumb;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

use App\Models\Message;
use App\Models\Question;
use App\Models\User;

class ApiQuestionMessageTest extends TestCase
{
    use RefreshDatabase;

    protected $userA;
    protected $userB;

    protected $question;

    protected $messageA;
    protected $messageB;
    protected $messageC;

    protected $thumbA;
    protected $thumbB;

    protected function setUp(): void
    {
        parent::setUp();

        $this->userA = User::factory()->create();
        $this->userB = User::factory()->create();

        $this->question = Question::factory()->create();

        $this->messageA = Message::factory()->create([
            'question_id' => $this->question->id,
            'author_id' => $this->userA->id,
            'legacy_author_name' => 'userA',
            'is_anonymous' => true,
        ]);
        $this->messageB = Message::factory()->create([
            'question_id' => $this->question->id,
            'author_id' => $this->userB->id,
            'is_anonymous' => true,
        ]);
        $this->messageC = Message::factory()->create([
            'question_id' => $this->question->id,
            'author_id' => $this->userB->id,
            'is_anonymous' => false,
        ]);
        $this->messageD = Message::factory()->create([
            'question_id' => $this->question->id,
            'author_id' => $this->userB->id,
            'is_anonymous' => false,
            'is_deleted' => true,
        ]);

        $this->thumbA = Thumb::factory()->create([
            'user_id' => $this->userA->id,
            'thumbable_id' => $this->messageA->id,
            'thumbable_type' => 'App\Models\Message',
            'type' => 'up',
        ]);
        $this->thumbB = Thumb::factory()->create([
            'user_id' => $this->userB->id,
            'thumbable_id' => $this->messageB->id,
            'thumbable_type' => 'App\Models\Message',
            'type' => 'down',
        ]);
    }

    public function testDataIsAnonymized(): void
    {
        // Verify the data from the perspective of userA
        $response = $this->actingAs($this->userA)
            ->getJson("/api/questions/{$this->question->id}/messages");

        $response->assertStatus(200)
            ->assertJson(fn(AssertableJson $json) => $json->has(4)
                // Message A - userA can see their own data
                ->where('0.id', $this->messageA->id)
                ->where('0.author_id', $this->userA->id)
                ->has('0.author')
                ->where('0.author.id', $this->userA->id)
                ->where('0.author.name', $this->userA->public_name ?? $this->userA->name)
                ->has('0.thumbs', 1)
                ->where('0.thumbs.0.id', $this->thumbA->id)
                ->where('0.thumbs_up_count', 1)
                ->where('0.thumbs_down_count', 0)
                // Message B - anonymous, userA cannot see author
                ->where('1.id', $this->messageB->id)
                ->where('1.author_id', null)
                ->missing('1.author')
                ->where('1.thumbs', [])
                ->where('1.thumbs_up_count', 0)
                ->where('1.thumbs_down_count', 1)
                // Message C - public, userA can see author
                ->where('2.id', $this->messageC->id)
                ->where('2.author_id', $this->userB->id)
                ->has('2.author')
                ->where('2.author.id', $this->userB->id)
                ->where('2.author.name', $this->userB->public_name ?? $this->userB->name)
                ->where('2.thumbs', [])
                ->where('2.thumbs_up_count', 0)
                ->where('2.thumbs_down_count', 0)
                // Message D - deleted, userA cannot see author
                ->where('3.id', $this->messageD->id)
                ->where('3.author_id', null)
                ->missing('3.author')
                ->where('3.is_deleted', 1)
                ->where('3.thumbs', [])
                ->where('3.thumbs_up_count', 0)
                ->where('3.thumbs_down_count', 0)
            );

// Verify the data from the perspective of userB
        $response = $this->actingAs($this->userB)
            ->getJson("/api/questions/{$this->question->id}/messages");

        $response->assertStatus(200)
            ->assertJson(fn(AssertableJson $json) => $json->has(4)
                // Message A - anonymous, userB cannot see author details
                ->where('0.id', $this->messageA->id)
                ->where('0.author_id', null)
                ->missing('0.author')
                ->where('0.thumbs', [])
                ->where('0.thumbs_up_count', 1)
                ->where('0.thumbs_down_count', 0)
                // Message B - userB can see their own data
                ->where('1.id', $this->messageB->id)
                ->where('1.author_id', $this->userB->id)
                ->has('1.author')
                ->where('1.author.id', $this->userB->id)
                ->where('1.author.name', $this->userB->public_name ?? $this->userB->name)
                ->has('1.thumbs', 1)
                ->where('1.thumbs.0.id', $this->thumbB->id)
                ->where('1.thumbs.0.type', 'down')
                ->where('1.thumbs_up_count', 0)
                ->where('1.thumbs_down_count', 1)
                // Message C - public, userB is author
                ->where('2.id', $this->messageC->id)
                ->where('2.author_id', $this->userB->id)
                ->has('2.author')
                ->where('2.author.id', $this->userB->id)
                ->where('2.author.name', $this->userB->public_name ?? $this->userB->name)
                ->where('2.thumbs', [])
                ->where('2.thumbs_up_count', 0)
                ->where('2.thumbs_down_count', 0)
                // Message D - deleted, userB cannot see they are author
                ->where('3.id', $this->messageD->id)
                ->where('3.author_id', null)
                ->missing('3.author')
                ->where('3.is_deleted', 1)
                ->where('3.thumbs', [])
            );
    }
}
