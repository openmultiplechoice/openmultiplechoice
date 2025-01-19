<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\User;

class ApiModulesTest extends TestCase
{
    use RefreshDatabase;

    protected $userAdmin;
    protected $userRegular;

    protected function setUp(): void
    {
        parent::setUp();

        $this->userAdmin = User::factory()->create([
            'is_admin' => true,
        ]);
        $this->userRegular = User::factory()->create();
    }

    public function testAuthz(): void
    {
        $this->actingAs($this->userAdmin)
            ->postJson('/api/modules', [
                'name' => 'New module',
            ])
            ->assertStatus(200);

        $this->actingAs($this->userRegular)
            ->postJson('/api/modules', [
                'name' => 'New module',
            ])
            ->assertStatus(403);
    }
}
