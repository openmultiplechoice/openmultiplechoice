<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\Module;
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
                'description' => 'Exam hints',
            ])
            ->assertStatus(200);

        $this->actingAs($this->userRegular)
            ->postJson('/api/modules', [
                'name' => 'New module',
                'subject_id' => $this->subject->id,
            ])
            ->assertStatus(403);
    }

    public function testShow(): void
    {
        $module = Module::factory()->for($this->subject)->create();

        $this->actingAs($this->userRegular)
            ->getJson("/api/modules/{$module->id}")
            ->assertOk()
            ->assertJsonPath('id', $module->id)
            ->assertJsonPath('subject.id', $this->subject->id);
    }

    public function testAdminCanUpdateModule(): void
    {
        $module = Module::factory()->for($this->subject)->create();
        $newSubject = Subject::create(['name' => 'New Subject']);

        $this->actingAs($this->userAdmin)
            ->putJson("/api/modules/{$module->id}", [
                'name' => 'Updated module',
                'subject_id' => $newSubject->id,
                'description' => 'Updated description',
            ])
            ->assertOk()
            ->assertJsonPath('name', 'Updated module')
            ->assertJsonPath('subject_id', $newSubject->id)
            ->assertJsonPath('description', 'Updated description');

        $this->assertDatabaseHas('modules', [
            'id' => $module->id,
            'name' => 'Updated module',
            'subject_id' => $newSubject->id,
            'description' => 'Updated description',
        ]);
    }

    public function testRegularUserCannotUpdateModule(): void
    {
        $module = Module::factory()->for($this->subject)->create();

        $this->actingAs($this->userRegular)
            ->putJson("/api/modules/{$module->id}", [
                'name' => 'Updated module',
            ])
            ->assertForbidden();
    }
}
