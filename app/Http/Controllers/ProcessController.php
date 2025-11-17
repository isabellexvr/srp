<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AccountabilityProcess;
use App\Models\School;
use App\Models\ChecklistItem;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProcessController extends Controller
{
    public function index(Request $request)
    {
        return Inertia::render('ProcessList');
    }

    public function create()
    {
        $schools = School::all();
        return Inertia::render('ProcessForm', [
            'schools' => $schools
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'school_id' => 'required|exists:schools,id',
            'year' => 'required|integer|min:2020|max:2030',
            'semester' => 'required|in:1,2',
            'president_name' => 'required|string|max:255',
            'treasurer_name' => 'required|string|max:255',
        ]);
        $process = AccountabilityProcess::create([
            'school_id' => $request->school_id,
            'year' => $request->year,
            'semester' => $request->semester,
            'president_name' => $request->president_name,
            'treasurer_name' => $request->treasurer_name,
            'process_number' => 'E:' . Str::random(8) . '/' . $request->year,
            'status' => 'rascunho',
            'created_by' => Auth::id(),
        ]);
        $this->createDefaultChecklistItems($process->id);
        return response()->json([
            'message' => 'Processo criado com sucesso',
            'process' => $process,
            'redirect_url' => route('checklist.show', $process->id)
        ]);
    }

    public function show($id)
    {
        $process = AccountabilityProcess::with(['school', 'checklistItems', 'purchases'])
            ->findOrFail($id);
        return Inertia::render('ProcessShow', [
            'process' => $process
        ]);
    }

    public function edit($id)
    {
        $process = AccountabilityProcess::findOrFail($id);
        $schools = School::all();
        return Inertia::render('ProcessForm', [
            'process' => $process,
            'schools' => $schools,
            'isEdit' => true
        ]);
    }

    public function update(Request $request, $id)
    {
        $process = AccountabilityProcess::findOrFail($id);
        $request->validate([
            'school_id' => 'required|exists:schools,id',
            'year' => 'required|integer|min:2020|max:2030',
            'semester' => 'required|in:1,2',
            'president_name' => 'required|string|max:255',
            'treasurer_name' => 'required|string|max:255',
        ]);
        $process->update($request->all());
        return response()->json([
            'message' => 'Processo atualizado com sucesso',
            'process' => $process
        ]);
    }

    public function destroy($id)
    {
        $process = AccountabilityProcess::findOrFail($id);
        if ($process->status !== 'rascunho') {
            return response()->json([
                'message' => 'Apenas processos em rascunho podem ser excluídos'
            ], 422);
        }
        $process->delete();
        return response()->json([
            'message' => 'Processo excluído com sucesso'
        ]);
    }

    private function createDefaultChecklistItems($processId)
    {
        $defaultItems = [
            ['item_number' => '1', 'description' => 'Memorando de abertura do processo de prestação de contas'],
            ['item_number' => '2', 'description' => 'Cartão do CNPJ do Conselho Escolar'],
            ['item_number' => '3', 'description' => 'Ata de Eleição e Posse do Conselho Escolar devidamente registrada em Cartório'],
            ['item_number' => '4', 'description' => 'Plano de aplicação dos recursos'],
        ];
        for ($i = 1; $i <= 30; $i++) {
            $defaultItems[] = [
                'item_number' => "5.$i",
                'description' => "Documento de Compra $i"
            ];
        }
        $defaultItems = array_merge($defaultItems, [
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
        foreach ($defaultItems as $item) {
            ChecklistItem::create([
                'accountability_process_id' => $processId,
                'item_number' => $item['item_number'],
                'description' => $item['description'],
                'status' => 'pending'
            ]);
        }
    }
}
