<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\User;

class AuthnTest extends TestCase
{
    use RefreshDatabase;

    public function testAuthnRequired(): void
    {
        $this->get('/')->assertRedirect('/login');
        $this->get('/decks')->assertRedirect('/login');

        $this->withHeader('Accept', 'application/json')->get('/api/decks')->assertUnauthorized();

        $user = User::factory()->create();

        $this->actingAs($user)->get('/')->assertOk();

        $this->withHeader('Accept', 'application/json')->actingAs($user)->get('/api/decks')->assertOk();
    }
}
