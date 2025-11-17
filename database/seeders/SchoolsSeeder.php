<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\School;

class SchoolsSeeder extends Seeder
{
    public function run(): void
    {
        $schools = [
            [
                'name' => 'Escola Estadual Modelo',
                'code' => 'EEM001',
                'address' => 'Rua das Flores, 123',
                'phone' => '(82) 99999-0001',
                'email' => 'modelo@escola.al.gov.br',
                'director_name' => 'Maria Silva',
            ],
            [
                'name' => 'Escola Municipal Exemplo',
                'code' => 'EME002',
                'address' => 'Av. Central, 456',
                'phone' => '(82) 99999-0002',
                'email' => 'exemplo@escola.al.gov.br',
                'director_name' => 'João Souza',
            ],
            [
                'name' => 'Colégio Estadual Teste',
                'code' => 'CET003',
                'address' => 'Praça da Paz, 789',
                'phone' => '(82) 99999-0003',
                'email' => 'teste@colegio.al.gov.br',
                'director_name' => 'Ana Lima',
            ],
        ];
        foreach ($schools as $school) {
            School::create($school);
        }
    }
}
