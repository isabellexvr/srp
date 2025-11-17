<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ChecklistItem;

class ChecklistItemsSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['item_number' => '1', 'description' => 'Memorando de abertura do processo de prestação de contas', 'status' => 'pending'],
            ['item_number' => '2', 'description' => 'Cartão do CNPJ do Conselho Escolar', 'status' => 'pending'],
            ['item_number' => '3', 'description' => 'Ata de Eleição e Posse do Conselho Escolar', 'status' => 'pending'],
            ['item_number' => '4', 'description' => 'Plano de aplicação dos recursos', 'status' => 'pending'],
        ];
        // Adiciona para accountability_process_id 1
        foreach ($items as $item) {
            ChecklistItem::create(array_merge($item, [
                'accountability_process_id' => 1
            ]));
        }
    }
}
