<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ChecklistItem;

class ChecklistItemsSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['accountability_process_id' => 1, 'item_number' => '1', 'description' => 'Memorando de abertura do processo de prestação de contas', 'status' => 'pending'],
            ['accountability_process_id' => 1, 'item_number' => '2', 'description' => 'Cartão do CNPJ do Conselho Escolar', 'status' => 'pending'],
            ['accountability_process_id' => 2, 'item_number' => '1', 'description' => 'Memorando de abertura do processo de prestação de contas', 'status' => 'completed'],
            ['accountability_process_id' => 2, 'item_number' => '2', 'description' => 'Cartão do CNPJ do Conselho Escolar', 'status' => 'completed'],
        ];
        foreach ($items as $item) {
            ChecklistItem::create($item);
        }
    }
}
