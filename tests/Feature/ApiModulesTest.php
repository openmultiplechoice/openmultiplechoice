<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\Subject;
use App\Models\User;

class ApiModulesTest extends TestCase
{
    use RefreshDatabase;

    protected $userAdmin;
    protected $userRegular;
    protected $subject;

    protected function setUp(): void
    {
        parent::setUp();

        $this->userAdmin = User::factory()->create([
            'is_admin' => true,
        ]);
        $this->userRegular = User::factory()->create();
        $this->subject = Subject::create(['name' => 'Test Subject']);
    }

    public function testAuthz(): void
    {
        $this->actingAs($this->userAdmin)
            ->postJson('/api/modules', [
                'name' => 'New module',
                'subject_id' => $this->subject->id,
            ])
            ->assertStatus(200);

        $this->actingAs($this->userRegular)
            ->postJson('/api/modules', [
                'name' => 'New module',
                'subject_id' => $this->subject->id,
            ])
            ->assertStatus(403);
    }
}
