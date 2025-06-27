<?php

namespace Database\Factories;

use App\Models\AnswerChoice;
use Illuminate\Database\Eloquent\Factories\Factory;

class AnswerChoiceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = AnswerChoice::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'is_correct' => false,
            'help_used' => false,
        ];
    }
}
