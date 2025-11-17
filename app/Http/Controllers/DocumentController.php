<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GeneralDocument;
use App\Models\PurchaseDocument;
use Illuminate\Support\Facades\Storage;

class DocumentController extends Controller
{
    public function uploadGeneralDocument(Request $request, $processId)
    {
        $request->validate([
            'document_type' => 'required|string',
            'file' => 'required|file',
        ]);
        $file = $request->file('file');
        $path = $file->store('documents/general');
        $document = GeneralDocument::create([
            'accountability_process_id' => $processId,
            'document_type' => $request->document_type,
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'uploaded_by' => $request->user()->id,
        ]);
        return response()->json(['message' => 'Documento enviado com sucesso', 'document' => $document]);
    }

    public function uploadPurchaseDocument(Request $request, $purchaseId)
    {
        $request->validate([
            'document_type' => 'required|string',
            'file' => 'required|file',
        ]);
        $file = $request->file('file');
        $path = $file->store('documents/purchases');
        $document = PurchaseDocument::create([
            'purchase_id' => $purchaseId,
            'document_type' => $request->document_type,
            'file_path' => $path,
            'file_name' => $file->getClientOriginalName(),
            'uploaded_by' => $request->user()->id,
            'authenticity_verified' => false,
        ]);
        return response()->json(['message' => 'Documento enviado com sucesso', 'document' => $document]);
    }

    public function destroy($documentId)
    {
        $document = GeneralDocument::find($documentId) ?? PurchaseDocument::find($documentId);
        if ($document) {
            Storage::delete($document->file_path);
            $document->delete();
            return response()->json(['message' => 'Documento excluído com sucesso']);
        }
        return response()->json(['message' => 'Documento não encontrado'], 404);
    }

    public function download($documentId)
    {
        $document = GeneralDocument::find($documentId) ?? PurchaseDocument::find($documentId);
        if ($document && Storage::exists($document->file_path)) {
            return Storage::download($document->file_path, $document->file_name);
        }
        return response()->json(['message' => 'Documento não encontrado'], 404);
    }
}
