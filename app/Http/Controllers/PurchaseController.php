<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccountabilityProcess;
use App\Models\Purchase;
use Inertia\Inertia;

class PurchaseController extends Controller
{
    public function index($processId)
    {
        $process = AccountabilityProcess::with('purchases')->findOrFail($processId);
        return Inertia::render('PurchaseList', [
            'process' => $process,
            'purchases' => $process->purchases
        ]);
    }

    public function store(Request $request, $processId)
    {
        $request->validate([
            'purchase_number' => 'required|string',
            'description' => 'required|string',
            'supplier_name' => 'required|string',
            'supplier_cnpj' => 'required|string',
            'value' => 'required|numeric',
            'purchase_date' => 'required|date',
        ]);
        $purchase = Purchase::create(array_merge($request->all(), [
            'accountability_process_id' => $processId
        ]));
        return response()->json(['message' => 'Compra criada com sucesso', 'purchase' => $purchase]);
    }

    public function update(Request $request, $processId, $purchaseId)
    {
        $purchase = Purchase::where('accountability_process_id', $processId)->findOrFail($purchaseId);
        $purchase->update($request->all());
        return response()->json(['message' => 'Compra atualizada com sucesso', 'purchase' => $purchase]);
    }

    public function destroy($processId, $purchaseId)
    {
        $purchase = Purchase::where('accountability_process_id', $processId)->findOrFail($purchaseId);
        $purchase->delete();
        return response()->json(['message' => 'Compra excluída com sucesso']);
    }

    public function bulkUpload(Request $request, $processId)
    {
        $purchases = $request->input('purchases', []);
        foreach ($purchases as $data) {
            Purchase::create(array_merge($data, [
                'accountability_process_id' => $processId
            ]));
        }
        return response()->json(['message' => 'Compras importadas com sucesso']);
    }
}
