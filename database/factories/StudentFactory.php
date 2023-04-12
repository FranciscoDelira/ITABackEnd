<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Student;
use App\Models\Program;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    protected $model = Student::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        
        return [
            'name'=> $this->faker->firstName(),
            'last_name'=> $this->faker->lastName(),
            'control'=> $this->faker->numerify('########'),
            'email'=>$this->faker->safeEmail(),
            'program_id'=> Program::all()->random()->id,
        ];
    }
}
