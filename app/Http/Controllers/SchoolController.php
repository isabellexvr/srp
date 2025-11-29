<?php

namespace App\Http\Controllers;

use App\Models\School;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function index()
    {
        $schools = School::withCount(['users', 'accountabilityProcesses'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Schools/Index', [
            'schools' => $schools,
        ]);
    }

    public function create()
    {
        return Inertia::render('Schools/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'code' => ['nullable', 'string', 'max:50'],
            'director_name' => ['nullable', 'string', 'max:255'],
            'address' => ['nullable', 'string', 'max:500'],
            'phone' => ['nullable', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
        ]);

        School::create($validated);

        return redirect()
            ->route('escolas.index')
            ->with('success', 'Escola criada com sucesso.');
    }

    public function show(School $school)
    {
        $school->load([
            'users' => function ($query) {
                $query->select('id', 'name', 'email', 'role', 'school_id');
            },
            'accountabilityProcesses' => function ($query) {
                $query->select('id', 'school_id', 'year', 'semester', 'status', 'created_at')
                    ->orderBy('year', 'desc')
                    ->orderBy('semester', 'desc');
            }
        ]);

        $school->loadCount(['users', 'accountabilityProcesses']);

        return Inertia::render('Schools/Show', [
            'school' => $school,
        ]);
    }

    public function destroy(School $school)
    {
        $school->delete();

        return redirect()
            ->route('escolas.index')
            ->with('success', 'Escola excluída com sucesso.');
    }
}
