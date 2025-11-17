<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccountabilityProcess;
use App\Models\ChecklistItem;
use App\Models\Purchase;
use Inertia\Inertia;

class ChecklistController extends Controller
{
    public function show($processId)
    {
        $process = AccountabilityProcess::with(['school', 'checklistItems'])->findOrFail($processId);
        $purchases = Purchase::where('accountability_process_id', $processId)->get();
        
        return Inertia::render('Checklist', [
            'process' => $process,
            'checklistItems' => $process->checklistItems,
            'purchases' => $purchases
        ]);
    }

    public function updateItem(Request $request, $processId, $itemId)
    {
        $item = ChecklistItem::where('accountability_process_id', $processId)->findOrFail($itemId);
        $item->update($request->only(['status', 'sei_number', 'notes']));
        
        return redirect()->back()->with('success', 'Item atualizado com sucesso');
    }

    public function bulkUpdate(Request $request, $processId)
    {
        $items = $request->input('items', []);
        foreach ($items as $itemData) {
            $item = ChecklistItem::where('accountability_process_id', $processId)->find($itemData['id']);
            if ($item) {
                $item->update($itemData);
            }
        }
        
        return redirect()->back()->with('success', 'Itens atualizados com sucesso');
    }
}