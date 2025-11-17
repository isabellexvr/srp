<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SchoolsSeeder::class,
            UsersSeeder::class,
            AccountabilityProcessesSeeder::class,
            PurchasesSeeder::class,
            ChecklistItemSeeder::class,
            
        ]);
    }
}
