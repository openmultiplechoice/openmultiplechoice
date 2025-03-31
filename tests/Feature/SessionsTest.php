<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\Deck;
use App\Models\User;
use App\Models\Question;

class SessionsTest extends TestCase
{
    use RefreshDatabase;

    protected $userA;
    protected $userB;

    protected $deckByA;

    protected $question;

    protected $answer;

    protected function setUp(): void
    {
        parent::setUp();

        $this->userA = User::factory()->create();
        $this->userB = User::factory()->create();

        $this->deckByA = Deck::factory()->create([
            'access' => 'public-ro',
            'user_id' => $this->userA->id,
        ]);

        $this->question = Question::factory()->create();

        $this->answer = $this->question->answers()->create([
            'text' => 'Answer 1',
            'is_correct' => true,
        ]);

        $this->deckByA->questions()->syncWithoutDetaching([
            $this->question->id,
        ]);
    }

    public function testCanCreateSessionForPublicDeck(): void
    {
        $this->actingAs($this->userB)
            ->postJson('/api/sessions', [
                'deck_id' => $this->deckByA->id,
            ])
            ->assertStatus(200);
    }

    public function testCanOpenSessionLinkingPublicDeck(): void
    {
        $this->actingAs($this->userB)
            ->from('/')
            ->post('/sessions', [
                'deck_id' => $this->deckByA->id,
            ])->assertRedirectToRoute('show.session', [
                'session' => 1,
            ]);

        $this->actingAs($this->userB)
            ->getJson(url('/api/sessions', 1))
            ->assertStatus(200);
    }

    public function testCannotCreateSessionForPrivateDeck(): void
    {
        $this->deckByA->access = 'private';
        $this->deckByA->save();

        $this->actingAs($this->userB)
            ->postJson('/api/sessions', [
                'deck_id' => $this->deckByA->id,
            ])
            ->assertStatus(404);

        $this->actingAs($this->userB)
            ->from('/')
            ->post('/sessions', [
                'deck_id' => $this->deckByA->id,
            ])->assertStatus(404);
    }

    public function testCannotOpenSessionLinkingPrivateDeck(): void
    {
        $this->actingAs($this->userB)
            ->postJson('/api/sessions', [
                'deck_id' => $this->deckByA->id,
            ])
            ->assertStatus(200);

        $this->deckByA->access = 'private';
        $this->deckByA->save();

        $this->actingAs($this->userB)
            ->getJson(url('/api/sessions', 1))
            ->assertStatus(400);

        $response = $this->actingAs($this->userB)
            ->from('/')
            ->get(url('/sessions', [
                'deck_id' => $this->deckByA->id,
            ]));

        $response->assertRedirectToRoute('index');
        $response->assertSessionHas('msg-error', "Sorry, can't open this session since it links a private deck.");
    }

    public function testCanUpdateSession(): void
    {
        $this->actingAs($this->userB)
            ->postJson('/api/sessions', [
                'deck_id' => $this->deckByA->id,
            ])
            ->assertStatus(200);

        $this->actingAs($this->userB)
            ->putJson('/api/sessions/1', [
                'name' => 'New name',
            ])
            ->assertStatus(200);

        $this->actingAs($this->userB)
            ->getJson(url('/api/sessions', 1))
            ->assertStatus(200)
            ->assertJsonPath('session.name', 'New name');
    }

    public function testCannotUpdateSessionNotOwned(): void
    {
        $this->actingAs($this->userB)
            ->postJson('/api/sessions', [
                'deck_id' => $this->deckByA->id,
            ])
            ->assertStatus(200);

        $this->actingAs($this->userA)
            ->putJson('/api/sessions/1', [
                'name' => 'New name',
            ])
            ->assertStatus(404);
    }

    public function testCanDeleteSession(): void
    {
        $this->actingAs($this->userB)
            ->postJson('/api/sessions', [
                'deck_id' => $this->deckByA->id,
            ])
            ->assertStatus(200);

        $this->actingAs($this->userB)
            ->deleteJson('/api/sessions/1')
            ->assertStatus(200);

        $this->actingAs($this->userB)
            ->getJson(url('/api/sessions', 1))
            ->assertStatus(404);
    }

    public function testCannotDeleteSessionNotOwned(): void
    {
        $this->actingAs($this->userB)
            ->postJson('/api/sessions', [
                'deck_id' => $this->deckByA->id,
            ])
            ->assertStatus(200);

        $this->actingAs($this->userA)
            ->deleteJson('/api/sessions/1')
            ->assertStatus(404);
    }

    public function testCanDeleteSessionWithChild(): void
    {
        $this->actingAs($this->userA)
            ->postJson('/api/sessions', [
                'deck_id' => $this->deckByA->id,
            ])
            ->assertStatus(200);

        $this->actingAs($this->userA)
            ->postJson('/api/sessions/1/answerchoices', [
                'question_id' => $this->question->id,
                'answer_id' => 1,
                'help_used' => false,
                'is_correct' => false,
            ])
            ->assertStatus(200);

        $this->actingAs($this->userA)
            ->postJson('/api/sessions/1/newfromincorrect')
            ->assertStatus(200);

        $this->actingAs($this->userA)
            ->getJson(url('/api/sessions'))
            ->assertStatus(200)
            ->assertJsonCount(2);

        $this->actingAs($this->userA)
            ->getJson(url('/api/sessions', 2))
            ->assertStatus(200)
            ->assertJsonPath('session.parent_session_id', 1);

        $this->actingAs($this->userA)
            ->deleteJson('/api/sessions/1')
            ->assertStatus(200);

        $this->actingAs($this->userA)
            ->getJson(url('/api/sessions'))
            ->assertStatus(200)
            ->assertJsonCount(1);

        $this->actingAs($this->userA)
            ->getJson(url('/api/sessions', 1))
            ->assertStatus(404);

        $this->actingAs($this->userA)
            ->getJson(url('/api/sessions', 2))
            ->assertStatus(200)
            ->assertJsonPath('session.parent_session_id', null);
    }

    public function testCanDeleteSessionWithParent(): void
    {
        $this->actingAs($this->userA)
            ->postJson('/api/sessions', [
                'deck_id' => $this->deckByA->id,
            ])
            ->assertStatus(200);

        $this->actingAs($this->userA)
            ->postJson('/api/sessions/1/answerchoices', [
                'question_id' => $this->question->id,
                'answer_id' => 1,
                'help_used' => false,
                'is_correct' => false,
            ])
            ->assertStatus(200);

        $this->actingAs($this->userA)
            ->postJson('/api/sessions/1/newfromincorrect')
            ->assertStatus(200);

        $this->actingAs($this->userA)
            ->getJson(url('/api/sessions'))
            ->assertStatus(200)
            ->assertJsonCount(2);

        $this->actingAs($this->userA)
            ->getJson(url('/api/sessions', 2))
            ->assertStatus(200)
            ->assertJsonPath('session.parent_session_id', 1);

        $this->actingAs($this->userA)
            ->deleteJson('/api/sessions/2')
            ->assertStatus(200);

        $this->actingAs($this->userA)
            ->getJson(url('/api/sessions'))
            ->assertStatus(200)
            ->assertJsonCount(1);

        $this->actingAs($this->userA)
            ->getJson(url('/api/sessions', 2))
            ->assertStatus(404);
    }
}
