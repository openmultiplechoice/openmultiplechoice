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

    protected function setUp(): void
    {
        parent::setUp();

        $this->userA = User::factory()->create();
        $this->userB = User::factory()->create();

        $this->deckByA = Deck::factory()->create([
            'access' => 'public-ro',
            'user_id' => $this->userA->id,
        ]);

        $this->deckByA->questions()->createMany([
            Question::factory()->make()->toArray(),
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
}
