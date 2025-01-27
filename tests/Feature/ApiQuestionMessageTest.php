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
            // The question has 3 messages
            ->assertJsonCount(3)
            ->assertJsonFragment([
                'id' => $this->messageA->id,
                // userA can see that they are the author of this message
                'author_id' => $this->userA->id,
                'legacy_author_name' => 'userA',
                // userA can see their own thumb
                'thumbs' => [
                    [
                        'id' => $this->thumbA->id,
                        'thumbable_id' => $this->messageA->id,
                        'type' => "up",
                        'user_id' => $this->userA->id,
                    ]
                ],
                'thumbs_up_count' => 1,
                'thumbs_down_count' => 0,
            ])
            ->assertJsonFragment([
                'id' => $this->messageB->id,
                // userA cannot see that userB is the author of this message
                'author_id' => null,
                // userA cannot see thumb data of userB
                'thumbs' => [],
                'thumbs_up_count' => 0,
                // ..only that there is one thumb down
                'thumbs_down_count' => 1,
            ])
            ->assertJsonFragment([
                'id' => $this->messageC->id,
                // userA can see that userB is the author of this message
                'author_id' => $this->userB->id,
                'thumbs' => [],
                'thumbs_up_count' => 0,
                'thumbs_down_count' => 0,
            ]);

        // Verify the data from the perspective of userB

        $response = $this->actingAs($this->userB)
            ->getJson("/api/questions/{$this->question->id}/messages");

        $response->assertStatus(200)
            ->assertJsonCount(3)
            ->assertJsonFragment([
                'id' => $this->messageA->id,
                'author_id' => null,
                'legacy_author_name' => null,
                'thumbs' => [],
                'thumbs_up_count' => 1,
                'thumbs_down_count' => 0,
            ])
            ->assertJsonFragment([
                'id' => $this->messageB->id,
                'author_id' => $this->userB->id,
                'thumbs' => [
                    [
                        'id' => $this->thumbB->id,
                        'thumbable_id' => $this->messageB->id,
                        'type' => "down",
                        'user_id' => $this->userB->id,
                    ]
                ],
                'thumbs_up_count' => 0,
                'thumbs_down_count' => 1,
            ])
            ->assertJsonFragment([
                'id' => $this->messageC->id,
                'author_id' => $this->userB->id,
                'thumbs' => [],
                'thumbs_up_count' => 0,
                'thumbs_down_count' => 0,
            ]);
    }
}
