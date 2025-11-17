<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AccountabilityProcess;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Dashboard');
    }

    public function stats(Request $request)
    {
        $user = Auth::user();
        $query = AccountabilityProcess::query();
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
                    'progress' => $process->calculateProgress(),
                ];
            });
        return response()->json($processes);
    }
}
