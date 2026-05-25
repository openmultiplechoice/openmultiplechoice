<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\Deck;
use App\Models\Module;
use App\Models\Question;
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

    public function testAuthz(): void
    {
        $this->actingAs($this->userA)
            ->getJson('/api/decks/' . $this->deckByAPrivate->id)
            ->assertOk()
            ->assertJsonPath('id', $this->deckByAPrivate->id);

        $this->actingAs($this->userB)
            ->getJson('/api/decks/' . $this->deckByAPublic->id)
            ->assertStatus(200);

        $this->actingAs($this->userB)
            ->getJson('/api/decks/' . $this->deckByAPrivate->id)
            ->assertStatus(404);
    }

    public function testIndexWithQuestionIdsReturnsAddToDeckCandidates(): void
    {
        $ownedQuestion = Question::factory()->create();
        $bookmarkedQuestion = Question::factory()->create();

        $ownedDeck = Deck::factory()->create([
            'access' => 'private',
            'user_id' => $this->userB->id,
        ]);
        $ownedDeck->questions()->attach($ownedQuestion->id);

        $listedOwnedDeck = Deck::factory()->create([
            'access' => 'public-rw-listed',
            'user_id' => $this->userB->id,
        ]);
        $listedOwnedDeck->questions()->attach(Question::factory()->create()->id);

        $archivedOwnedDeck = Deck::factory()->create([
            'access' => 'private',
            'is_archived' => true,
            'user_id' => $this->userB->id,
        ]);
        $archivedOwnedDeck->questions()->attach(Question::factory()->create()->id);

        $ephemeralOwnedDeck = Deck::factory()->create([
            'access' => 'private',
            'is_ephemeral' => true,
            'user_id' => $this->userB->id,
        ]);
        $ephemeralOwnedDeck->questions()->attach(Question::factory()->create()->id);

        $bookmarkedWritableDeck = Deck::factory()->create([
            'access' => 'public-rw',
            'user_id' => $this->userA->id,
        ]);
        $bookmarkedWritableDeck->questions()->attach($bookmarkedQuestion->id);
        $bookmarkedWritableDeck->bookmarks()->attach($this->userB->id);

        $bookmarkedReadOnlyDeck = Deck::factory()->create([
            'access' => 'public-ro',
            'user_id' => $this->userA->id,
        ]);
        $bookmarkedReadOnlyDeck->questions()->attach(Question::factory()->create()->id);
        $bookmarkedReadOnlyDeck->bookmarks()->attach($this->userB->id);

        $unbookmarkedWritableDeck = Deck::factory()->create([
            'access' => 'public-rw',
            'user_id' => $this->userA->id,
        ]);
        $unbookmarkedWritableDeck->questions()->attach(Question::factory()->create()->id);

        $response = $this->actingAs($this->userB)
            ->getJson('/api/decks/withquestionids')
            ->assertOk()
            ->assertJsonCount(2);

        $decks = collect($response->json());

        $this->assertEqualsCanonicalizing(
            [$ownedDeck->id, $bookmarkedWritableDeck->id],
            $decks->pluck('id')->all()
        );

        $this->assertEquals(
            [$ownedQuestion->id],
            collect($decks->firstWhere('id', $ownedDeck->id)['questions'])->pluck('id')->all()
        );
        $this->assertEquals(
            [$bookmarkedQuestion->id],
            collect($decks->firstWhere('id', $bookmarkedWritableDeck->id)['questions'])->pluck('id')->all()
        );
    }
}
