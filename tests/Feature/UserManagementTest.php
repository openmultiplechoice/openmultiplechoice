<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class UserManagementTest extends TestCase
{
    public function testAdminAuthn()
    {
        $this->get('/admin/users')->assertRedirect('/login');
        $this->get('/admin/users/create')->assertRedirect('/login');
        $this->get('/admin/users/1/edit')->assertRedirect('/login');
        $this->post('/admin/users')->assertRedirect('/login');
        $this->put('/admin/users/1')->assertRedirect('/login');
        $this->post('/admin/users/1/reset-password')->assertRedirect('/login');

        $user = User::factory()->create();

        $this->actingAs($user)->get('/admin/users')->assertForbidden();
        $this->actingAs($user)->get('/admin/users/create')->assertForbidden();
        $this->actingAs($user)->get('/admin/users/1/edit')->assertForbidden();
        $this->actingAs($user)->post('/admin/users')->assertForbidden();
        $this->actingAs($user)->put('/admin/users/1')->assertForbidden();
        $this->actingAs($user)->post('/admin/users/1/reset-password')->assertForbidden();

        $admin = User::factory()->create(['is_admin' => true]);

        $this->actingAs($admin)->get('/admin/users')->assertOk();
        $this->actingAs($admin)->get('/admin/users/create')->assertOk();
        $this->actingAs($admin)->get('/admin/users/1/edit')->assertOk();
        $this->actingAs($admin)->post('/admin/users', [ 'name' => 'Test', 'email' => 'mail@example.com' ])->assertRedirect('/admin/users/3/edit');
        $this->actingAs($admin)->put('/admin/users/3', [ 'name' => 'Test1', 'email' => 'mail1@example.com' ])->assertRedirect('/admin/users/3/edit');
        $this->actingAs($admin)->post('/admin/users/3/reset-password')->assertRedirect('/admin/users/3/edit');
    }
}
