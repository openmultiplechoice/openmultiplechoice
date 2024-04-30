<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

use App\Models\RegistrationToken;

class RegistrationTokenFactory extends Factory
{
    protected $model = RegistrationToken::class;

    public function definition(): array
    {
        return [
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            //TODO(levinuss) make token less prone to confusion (e.g. 0 and O)
            'token' => Str::random(10),
        ];
    }
}
