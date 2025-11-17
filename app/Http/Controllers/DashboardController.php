<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AccountabilityProcess;
use App\Models\School;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $query = AccountabilityProcess::query();
        if ($user->role === 'school_admin') {
            $query->where('school_id', $user->school_id);
        }
        $total = $query->count();
        $emAndamento = AccountabilityProcess::where('school_id', $user->school_id ?? null)
            ->whereIn('status', ['rascunho', 'em_analise'])->count();
        $pendentes = AccountabilityProcess::where('school_id', $user->school_id ?? null)
            ->where('status', 'rascunho')->count();
        $aprovados = AccountabilityProcess::where('school_id', $user->school_id ?? null)
            ->where('status', 'aprovado')->count();

        $stats = [
            'total' => $total,
            'em_andamento' => $emAndamento,
            'pendentes' => $pendentes,
            'aprovados' => $aprovados,
        ];

        $processes = AccountabilityProcess::with('school')
            ->when($user->role === 'school_admin', function ($query) use ($user) {
                return $query->where('school_id', $user->school_id);
            })
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($process) {
                return [
                    'id' => $process->process_number,
                    'school' => $process->school->name,
                    'semester' => $process->semester . 'º/' . $process->year,
                    'status' => $process->status,
                    'progress' => $this->calculateProgress($process),
                ];
            });

        return Inertia::render('Dashboard', [
            'stats' => $stats,
            'recentProcesses' => $processes,
        ]);
    }

    public function stats(Request $request)
    {
        $user = Auth::user();

        $query = AccountabilityProcess::query();

        // Filtra por escola se for school_admin
        if ($user->role === 'school_admin') {
            $query->where('school_id', $user->school_id);
        }

        $total = $query->count();
        $emAndamento = $query->whereIn('status', ['rascunho', 'em_analise'])->count();
        $pendentes = $query->where('status', 'rascunho')->count();
        $aprovados = $query->where('status', 'aprovado')->count();

        return response()->json([
            'total' => $total,
            'em_andamento' => $emAndamento,
            'pendentes' => $pendentes,
            'aprovados' => $aprovados,
        ]);
    }

    public function recentProcesses(Request $request)
    {
        $user = Auth::user();

        $processes = AccountabilityProcess::with('school')
            ->when($user->role === 'school_admin', function ($query) use ($user) {
                return $query->where('school_id', $user->school_id);
            })
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($process) {
                return [
                    'id' => $process->process_number,
                    'school' => $process->school->name,
                    'semester' => $process->semester . 'º/' . $process->year,
                    'status' => $process->status,
                    'progress' => $this->calculateProgress($process),
                ];
            });

        return response()->json($processes);
    }

    private function calculateProgress($process)
    {
        // Método simplificado para calcular progresso
        // Na implementação real, você calcularia baseado nos itens do checklist
        $statusProgress = [
            'rascunho' => 30,
            'em_analise' => 75,
            'aprovado' => 100,
            'rejeitado' => 85,
        ];

        return $statusProgress[$process->status] ?? 0;
    }
}