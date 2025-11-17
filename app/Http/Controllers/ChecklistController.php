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

    public function progressUpdate(Request $request, $processId)
    {
        $items = $request->all();
        
        foreach ($items as $itemId => $itemData) {
            $item = ChecklistItem::where('accountability_process_id', $processId)
                                ->find($itemId);
            if ($item) {
                $item->update([
                    'status' => $itemData['status'] ?? $item->status,
                    'sei_number' => $itemData['sei_number'] ?? $item->sei_number,
                    'notes' => $itemData['notes'] ?? $item->notes,
                ]);
            }
        }
        
        return redirect()->back()->with('success', 'Checklist atualizado com sucesso');
    }
}