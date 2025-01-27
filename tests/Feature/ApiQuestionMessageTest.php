<?php

namespace Tests\Feature;

use App\Models\Thumb;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\Message;
use App\Models\Question;
use App\Models\User;

class ApiQuestionMessageTest extends TestCase
{
    use RefreshDatabase;

    protected $userA;
    protected $userB;

    protected function setUp(): void
    {
        parent::setUp();

        $this->userA = User::factory()->create();
        $this->userB = User::factory()->create();
    }

    public function testIndex(): void
    {
        $question = Question::factory()->create();

        $messageA = Message::factory()->create([
            'question_id' => $question->id,
            'author_id' => $this->userA->id,
            'is_anonymous' => true,
        ]);
        $messageB = Message::factory()->create([
            'question_id' => $question->id,
            'author_id' => $this->userB->id,
            'is_anonymous' => true,
        ]);
        $messageC = Message::factory()->create([
            'question_id' => $question->id,
            'author_id' => $this->userB->id,
            'is_anonymous' => false,
        ]);

        $thumbA = Thumb::factory()->create([
            'user_id' => $this->userA->id,
            'thumbable_id' => $messageA->id,
            'thumbable_type' => 'App\Models\Message',
            'type' => 'up',
        ]);

        $thumbB = Thumb::factory()->create([
            'user_id' => $this->userB->id,
            'thumbable_id' => $messageB->id,
            'thumbable_type' => 'App\Models\Message',
            'type' => 'down',
        ]);

        $response = $this->actingAs($this->userA)
            ->getJson("/api/questions/{$question->id}/messages");
        $response->assertStatus(200)
            ->assertJsonCount(3)
            ->assertJsonFragment([
                'id' => $messageA->id,
                'author_id' => $this->userA->id,
                'thumbs' => [
                    [
                        'id' => $thumbA->id,
                        'thumbable_id' => $messageA->id,
                        'type' => "up",
                        'user_id' => $this->userA->id,
                    ]
                ],
                'thumbs_up_count' => 1,
                'thumbs_down_count' => 0,
            ])
            ->assertJsonFragment([
                'id' => $messageB->id,
                'author_id' => null,
                'thumbs' => [],
                'thumbs_up_count' => 0,
                'thumbs_down_count' => 1,
            ])
            ->assertJsonFragment([
                'id' => $messageC->id,
                'author_id' => $this->userB->id,
                'thumbs' => [],
                'thumbs_up_count' => 0,
                'thumbs_down_count' => 0,
            ]);
    }

}
