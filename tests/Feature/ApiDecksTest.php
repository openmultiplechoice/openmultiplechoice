<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\Deck;
use App\Models\Module;
use App\Models\User;

class ApiDecksTest extends TestCase
{
    use RefreshDatabase;

    protected $userA;
    protected $userB;

    protected $moduleA;
    protected $moduleB;

    protected $deckPublicRwListed;
    protected $deckByAPublic;
    protected $deckByAPrivate;

    protected function setUp(): void
    {
        parent::setUp();

        $this->userA = User::factory()->create();
        $this->userB = User::factory()->create();

        $this->moduleA = Module::factory()->create();
        $this->moduleB = Module::factory()->create();

        $this->deckPublicRwListed = Deck::factory()->create([
            'module_id' => $this->moduleA->id,
            'access' => 'public-rw-listed',
            'user_id' => $this->userA->id,
        ]);

        $this->deckByAPrivate = Deck::factory()->create([
            'module_id' => $this->moduleA->id,
            'access' => 'private',
            'user_id' => $this->userA->id,
        ]);

        $this->deckByAPublic = Deck::factory()->create([
            'module_id' => $this->moduleA->id,
            'access' => 'public-ro',
            'user_id' => $this->userA->id,
        ]);
    }

    public function testMainListing(): void
    {
        foreach ([$this->userA, $this->userB] as $user) {
            $this->actingAs($user)
                ->getJson('/api/decks?module=' . $this->moduleA->id . '&kind=public-rw-listed')
                ->assertOk()
                ->assertJsonCount(1, 'data')
                ->assertJsonPath('data.0.id', $this->deckPublicRwListed->id)
                ->assertJsonPath('data.0.access', $this->deckPublicRwListed->access)
                ->assertJsonPath('data.0.name', $this->deckPublicRwListed->name)
                ->assertJsonPath('data.0.user_id', $this->userA->id);

            $this->actingAs($user)
                ->getJson('/api/decks?module=' . $this->moduleB->id . '&kind=public-rw-listed')
                ->assertOk()
                ->assertJsonCount(0, 'data');
        }
    }

    public function testUserListing(): void
    {
        $this->actingAs($this->userA)
            ->getJson('/api/decks?module=' . $this->moduleA->id . '&kind=user')
            ->assertOk()
            ->assertJsonCount(2, 'data');

        $this->actingAs($this->userB)
            ->getJson('/api/decks?module=' . $this->moduleA->id . '&kind=user')
            ->assertOk()
            ->assertJsonCount(0, 'data');
    }

    public function testPublicListing(): void
    {
        $this->actingAs($this->userA)
            ->getJson('/api/decks?module=' . $this->moduleA->id . '&kind=public')
            ->assertOk()
            ->assertJsonCount(1, 'data');

        $this->actingAs($this->userB)
            ->getJson('/api/decks?module=' . $this->moduleA->id . '&kind=public')
            ->assertOk()
            ->assertJsonCount(1, 'data');
    }
}
