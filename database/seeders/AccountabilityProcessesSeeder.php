<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AccountabilityProcess;

class AccountabilityProcessesSeeder extends Seeder
{
    public function run(): void
    {
        $processes = [
            [
                'school_id' => 1,
                'year' => 2025,
                'semester' => 1,
                'process_number' => 'E:ABC12345/2025',
                'status' => 'rascunho',
                'president_name' => 'Carlos Presidente',
                'treasurer_name' => 'Fernanda Tesoureira',
                'submission_date' => null,
            ],
            [
                'school_id' => 2,
                'year' => 2025,
                'semester' => 2,
                'process_number' => 'E:XYZ67890/2025',
                'status' => 'aprovado',
                'president_name' => 'Paulo Presidente',
                'treasurer_name' => 'Juliana Tesoureira',
                'submission_date' => '2025-07-01',
            ],
        ];
        foreach ($processes as $process) {
            AccountabilityProcess::create($process);
        }
    }
}
