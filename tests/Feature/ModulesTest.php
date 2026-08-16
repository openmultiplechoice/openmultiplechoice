<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\Module;
use App\Models\Subject;
use App\Models\User;

class ModulesTest extends TestCase
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

    public function testModeratorCanUpdateModuleDescription(): void
    {
        $moderator = User::factory()->create(['is_moderator' => true]);
        $module = Module::factory()->create([
            'name' => 'Moderator editable module',
            'subject_id' => $this->subject->id,
        ]);

        $this->actingAs($moderator)
            ->put("/modules/{$module->id}", [
                'name' => $module->name,
                'subject_id' => $this->subject->id,
                'description' => 'Updated description',
            ])
            ->assertRedirect(route('show.module', $module));

        $this->assertDatabaseHas('modules', [
            'id' => $module->id,
            'description' => 'Updated description',
        ]);
    }

    public function testAdminCanCreateModuleWithDescription(): void
    {
        $response = $this->actingAs($this->userAdmin)
            ->post('/modules', [
                'name' => 'New web module',
                'subject_id' => $this->subject->id,
                'description' => 'Web form description',
            ]);

        $module = Module::where('name', 'New web module')->sole();

        $response->assertRedirect(route('show.module', $module));

        $this->assertDatabaseHas('modules', [
            'name' => 'New web module',
            'subject_id' => $this->subject->id,
            'description' => 'Web form description',
        ]);
    }

    public function testRegularUserCannotUpdateModule(): void
    {
        $module = Module::factory()->create([
            'name' => 'Protected description module',
            'subject_id' => $this->subject->id,
        ]);

        $this->actingAs($this->userRegular)
            ->put("/modules/{$module->id}", [
                'name' => 'Renamed module',
                'subject_id' => $this->subject->id,
                'description' => 'Regular user description',
            ])
            ->assertStatus(403);

        $this->assertDatabaseHas('modules', [
            'id' => $module->id,
            'name' => 'Protected description module',
            'description' => null,
        ]);
    }
}
