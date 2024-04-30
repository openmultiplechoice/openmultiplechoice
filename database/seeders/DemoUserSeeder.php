<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

use App\Models\User;

class DemoUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'demo',
            'email' => 'demo@example.com',
            'password' => Hash::make('demo'),
            'email_verified_at' => now(),
        ]);
        User::create([
            'name' => 'demoadmin',
            'email' => 'demoadmin@example.com',
            'password' => Hash::make('demoadmin'),
            'email_verified_at' => now(),
            'is_admin' => true,
        ]);
    }
}
