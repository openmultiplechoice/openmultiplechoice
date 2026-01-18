<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

use App\Models\User;

class UserSettingsTest extends TestCase
{
    use RefreshDatabase;

    public function testCanShowDefaultThemeMode(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->getJson('/api/users/me/settings')
            ->assertOk()
            ->assertJsonPath('theme_mode', 'auto');
    }

    public function testCanUpdateThemeMode(): void
    {
        $user = User::factory()->create();

        foreach (['auto', 'light', 'dark'] as $themeMode) {
            $this->actingAs($user)
                ->putJson('/api/users/me/settings', [
                    'theme_mode' => $themeMode,
                ])
                ->assertOk()
                ->assertJsonPath('theme_mode', $themeMode);

            $this->assertDatabaseHas('user_settings', [
                'user_id' => $user->id,
                'theme_mode' => $themeMode,
            ]);
        }
    }

    public function testThemeModeMustBeValid(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->putJson('/api/users/me/settings', [
                'theme_mode' => 'sepia',
            ])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['theme_mode']);
    }

    public function testStoredThemeModeSetsServerRenderedThemeAttributes(): void
    {
        foreach (['light', 'dark'] as $themeMode) {
            $user = User::factory()->create();
            $user->settings->theme_mode = $themeMode;
            $user->settings->save();

            $this->actingAs($user)
                ->get('/')
                ->assertOk()
                ->assertSee('data-omc-theme-mode="'.$themeMode.'"', false)
                ->assertSee('data-bs-theme="'.$themeMode.'"', false)
                ->assertSee('data-theme-mode="'.$themeMode.'"', false);
        }
    }

    public function testAutoThemeModeDoesNotSetServerRenderedBootstrapTheme(): void
    {
        $user = User::factory()->create();
        $user->settings->theme_mode = 'auto';
        $user->settings->save();

        $this->actingAs($user)
            ->get('/')
            ->assertOk()
            ->assertSee('data-omc-theme-mode="auto"', false)
            ->assertSee('data-theme-mode="auto"', false)
            ->assertDontSee('data-bs-theme=', false);
    }

    public function testInvalidStoredThemeModeFallsBackToAutoWhenRendered(): void
    {
        $user = User::factory()->create();
        $user->settings->theme_mode = 'sepia';
        $user->settings->save();

        $this->actingAs($user)
            ->get('/')
            ->assertOk()
            ->assertSee('data-omc-theme-mode="auto"', false)
            ->assertSee('data-theme-mode="auto"', false)
            ->assertDontSee('data-bs-theme=', false)
            ->assertDontSee('sepia', false);
    }

    public function testThemeCycleButtonUsesStoredMode(): void
    {
        $user = User::factory()->create();
        $user->settings->theme_mode = 'dark';
        $user->settings->save();

        $this->actingAs($user)
            ->get('/')
            ->assertOk()
            ->assertSee('data-omc-theme-mode="dark"', false)
            ->assertSee('data-bs-theme="dark"', false)
            ->assertSee('id="ThemeModeButton"', false)
            ->assertSee('data-theme-mode="dark"', false);
    }

    public function testThemeCycleButtonIsNotLoadedForGuests(): void
    {
        $this->get('/login')
            ->assertOk()
            ->assertDontSee('id="ThemeModeButton"', false)
            ->assertDontSee('resources/js/ThemeModeButton.js', false);
    }
}
