<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccountabilityProcess;
use App\Models\ChecklistItem;
use Inertia\Inertia;

class ChecklistController extends Controller
{
    public function show($processId)
    {
        $process = AccountabilityProcess::with('checklistItems')->findOrFail($processId);
        return Inertia::render('ChecklistShow', [
            'process' => $process,
            'checklistItems' => $process->checklistItems
        ]);
    }

    public function updateItem(Request $request, $processId, $itemId)
    {
        $item = ChecklistItem::where('accountability_process_id', $processId)->findOrFail($itemId);
        $item->update($request->only(['status', 'sei_number', 'notes']));
        return response()->json(['message' => 'Item atualizado com sucesso', 'item' => $item]);
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
        return response()->json(['message' => 'Itens atualizados com sucesso']);
    }
}
