<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@seduc.al.gov.br',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'school_id' => null,
            ],
            [
                'name' => 'Gestor Escola Modelo',
                'email' => 'gestor.modelo@escola.al.gov.br',
                'password' => Hash::make('modelo123'),
                'role' => 'school_admin',
                'school_id' => 1,
            ],
            [
                'name' => 'Conselheiro Fiscal',
                'email' => 'fiscal@colegio.al.gov.br',
                'password' => Hash::make('fiscal123'),
                'role' => 'fiscal_council',
                'school_id' => 3,
            ],
        ];
        foreach ($users as $user) {
            User::create($user);
        }
    }
}
