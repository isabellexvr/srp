<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Purchase;

class PurchasesSeeder extends Seeder
{
    public function run(): void
    {
        $purchases = [
            [
                'accountability_process_id' => 1,
                'purchase_number' => 'Compra 01',
                'description' => 'Compra de materiais escolares',
                'supplier_name' => 'Fornecedor A',
                'supplier_cnpj' => '12.345.678/0001-99',
                'value' => 1500.00,
                'purchase_date' => '2025-03-10',
            ],
            [
                'accountability_process_id' => 2,
                'purchase_number' => 'Compra 02',
                'description' => 'Compra de equipamentos de informática',
                'supplier_name' => 'Fornecedor B',
                'supplier_cnpj' => '98.765.432/0001-88',
                'value' => 3500.00,
                'purchase_date' => '2025-08-15',
            ],
        ];
        foreach ($purchases as $purchase) {
            Purchase::create($purchase);
        }
    }
}
