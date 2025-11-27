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
            ->orderBy('name')
            ->get();

        return Inertia::render('Schools/Index', [
            'schools' => $schools,
        ]);
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
}
