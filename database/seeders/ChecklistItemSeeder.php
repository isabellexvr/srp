<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ChecklistItem;

class ChecklistItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['item_number' => '1', 'description' => 'Memorando de abertura do processo de prestação de contas'],
            ['item_number' => '2', 'description' => 'Cartão do CNPJ do Conselho Escolar'],
            ['item_number' => '3', 'description' => 'Ata de Eleição e Posse do Conselho Escolar'],
            ['item_number' => '4', 'description' => 'Plano de aplicação dos recursos'],
        ];
        // 5.1 a 5.30 - Documentos de Compras
        for ($i = 1; $i <= 30; $i++) {
            $items[] = [
                'item_number' => "5.$i",
                'description' => "Documento de Compra $i"
            ];
        }
        $items = array_merge($items, [
            ['item_number' => '7.1', 'description' => 'DOC 1 - CONTRATO DE INTERNET'],
            ['item_number' => '7.2', 'description' => 'DOC 2 - COMPROVANTE DE DEPÓSITO'],
            ['item_number' => '8.1', 'description' => 'Extratos da Conta Corrente'],
            ['item_number' => '8.2', 'description' => 'Extratos do Fundo de Investimento'],
            ['item_number' => '9', 'description' => 'Parecer do Conselho Fiscal'],
            ['item_number' => '10', 'description' => 'Demonstrativo de execução da receita e da despesa'],
            ['item_number' => '11', 'description' => 'Demonstrativo consolidado'],
            ['item_number' => '12', 'description' => 'Relação de Bens Adquiridos'],
            ['item_number' => '13', 'description' => 'Termo de Doação'],
            ['item_number' => '14', 'description' => 'Conciliação Bancária'],
            ['item_number' => '15', 'description' => 'Formulário de Acompanhamento das Ações'],
        ]);
        // Get a valid accountability_process_id (first one)
        $processId = \App\Models\AccountabilityProcess::query()->value('id');
        foreach ($items as $item) {
            ChecklistItem::create([
                'accountability_process_id' => $processId,
                'item_number' => $item['item_number'],
                'description' => $item['description'],
                'status' => 'pending',
            ]);
        }
    }
}
