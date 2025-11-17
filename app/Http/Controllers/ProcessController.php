<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AccountabilityProcess;
use App\Models\School;
use Illuminate\Support\Facades\Auth;

class ProcessController extends Controller
{
    public function index(Request $request)
    {
        $query = AccountabilityProcess::with('school');
        
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
        
        $processes = $query->orderBy('created_at', 'desc')->get();

        return Inertia::render('ProcessList', [
            'processes' => $processes,
            'filters' => $request->only(['search', 'year', 'status'])
        ]);
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
            'process_number' => 'E:' . strtoupper(uniqid()) . '/' . $request->year,
            'status' => 'rascunho',
            'created_by' => Auth::id(),
        ]);

        return redirect()->route('processes.index')
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
            'created_by' => Auth::id(),
        ]);

        return response()->json([
            'process' => $process,
            'redirect_url' => route('checklist.show', $process->id)
        ]);
    }

    public function destroy($id)
    {
        $process = AccountabilityProcess::findOrFail($id);
        
        // Verifica se o usuário tem permissão
        if (Auth::user()->role === 'school_admin' && $process->school_id !== Auth::user()->school_id) {
            abort(403);
        }

        $process->delete();

        return redirect()->route('processes.index')
            ->with('success', 'Processo excluído com sucesso!');
    }
}