<?php

namespace Database\Seeders;

use App\Models\Student;
use App\Models\Program;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Program::factory(3)->create();
        Student::factory(10)->create();

/*$program = new Program;
$program->name = 'ITIC';
$program->description = 'La mejor carrera';
$program->save();

$program = new Program;
$program->name = 'IGE';
$program->description = 'Una carrera';
$program->save();

$student = new Student;
$student->name = 'Andrea';
$student->last_name = 'Pineda';
$student->email = 'Andrea.p@gmial.com';
$student->control = '19151739';
$student->program_id = '2';
$student->save();

$student = new Student;
$student->name = 'Daniel';
$student->last_name = 'Pineda';
$student->email = 'Daniel.p@gmial.com';
$student->control = '19151722';
$student->program_id = '1';
$student->save();*/

//$this->call([StudentSeeder::class]);

    }
}
