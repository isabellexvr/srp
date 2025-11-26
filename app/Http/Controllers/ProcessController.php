<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AccountabilityProcess;
use App\Models\School;
use App\Models\ChecklistItem;
use Illuminate\Support\Facades\Auth;

class ProcessController extends Controller
{
    public function index(Request $request)
    {
        $query = AccountabilityProcess::with(['school', 'checklistItems']);
        
        // Filtros
        if ($request->has('search') && $request->search) {
            $query->where(function($q) use ($request) {
                $q->where('process_number', 'like', "%{$request->search}%")
                  ->orWhereHas('school', function($q) use ($request) {
                      $q->where('name', 'like', "%{$request->search}%");
                  });
            });
        }
        
        if ($request->has('year') && $request->year !== 'all') {
            $query->where('year', $request->year);
        }
        
        if ($request->has('status') && $request->status !== 'all') {
            $query->where('status', $request->status);
        }
        
        // Filtra por escola se for school_admin
        if (Auth::user()->role === 'school_admin') {
            $query->where('school_id', Auth::user()->school_id);
        }
        
        $processes = $query->orderBy('created_at', 'desc')->get()
            ->map(function ($process) {
                return [
                    'id' => $process->id,
                    'process_number' => $process->process_number,
                    'school' => $process->school,
                    'year' => $process->year,
                    'semester' => $process->semester,
                    'status' => $process->status,
                    'progress' => $process->calculated_progress, // Usa o accessor
                    'president_name' => $process->president_name,
                    'treasurer_name' => $process->treasurer_name,
                    'created_at' => $process->created_at,
                ];
            });

        return Inertia::render('ProcessList', [
            'processes' => $processes,
            'filters' => $request->only(['search', 'year', 'status'])
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
            'process_number' => 'E:' . strtoupper(uniqid()) . '/' . $request->year,
            'status' => 'rascunho',
            'progress' => 0, // Inicia com 0%
        ]);

        // Criar itens do checklist padrão
        $this->createDefaultChecklistItems($process->id);

        return redirect()->route('processos.index')
            ->with('success', 'Processo criado com sucesso!');
    }

    public function storeAndChecklist(Request $request)
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
            'process_number' => 'E:' . strtoupper(uniqid()) . '/' . $request->year,
            'status' => 'rascunho',
            'progress' => 0,
        ]);

        // Criar itens do checklist padrão
        $this->createDefaultChecklistItems($process->id);

        return redirect()->route('checklist.show', $process->id)
            ->with('success', 'Processo criado com sucesso!');
    }

    private function createDefaultChecklistItems($processId)
    {
        $defaultItems = [
            ['item_number' => '1', 'description' => 'Memorando de abertura do processo de prestação de contas'],
            ['item_number' => '2', 'description' => 'Cartão do CNPJ do Conselho Escolar'],
            ['item_number' => '3', 'description' => 'Ata de Eleição e Posse do Conselho Escolar devidamente registrada em Cartório'],
            ['item_number' => '4', 'description' => 'Plano de aplicação dos recursos'],
            ['item_number' => '7.1', 'description' => 'DOC 1 - CONTRATO DE INTERNET'],
            ['item_number' => '7.2', 'description' => 'DOC 2 - COMPROVANTE DE DEPÓSITO'],
            ['item_number' => '8.1', 'description' => 'Extratos da Conta Corrente'],
            ['item_number' => '8.2', 'description' => 'Extratos do Fundo de Investimento'],
            ['item_number' => '9', 'description' => 'Parecer do Conselho Fiscal'],
            ['item_number' => '10', 'description' => 'Demonstrativo de execução da receita e da despesa e dos pagamentos efetuados'],
        ];

        foreach ($defaultItems as $item) {
            ChecklistItem::create([
                'accountability_process_id' => $processId,
                'item_number' => $item['item_number'],
                'description' => $item['description'],
                'status' => 'pending'
            ]);
        }
    }

        public function create()
    {
        $schools = School::all();

        return Inertia::render('ProcessForm', [
            'schools' => $schools
        ]);
    }
}