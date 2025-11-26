<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ChecklistController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return auth()->check()
        ? redirect()->route('dashboard')
        : redirect()->route('login.form');
})->name('home');

Route::middleware(['guest'])->group(function () {
    Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login.form');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});

Route::middleware(['auth'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/processos', [ProcessController::class, 'index'])->name('processos.index');
    Route::get('/processos-create', [ProcessController::class, 'create'])->name('processos.create');
    Route::post('/processos', [ProcessController::class, 'store'])->name('processos.store');
    Route::post('/processos-store-and-checklist', [ProcessController::class, 'storeAndChecklist']);
    Route::delete('/processos-delete/{process}', [ProcessController::class, 'destroy'])->name('processos.destroy');
    Route::get('/processos-show/{process}', [ChecklistController::class, 'show'])->name('checklist.show');
    Route::put('/processos/{process}/checklist/{item}', [ChecklistController::class, 'updateItem']);

    Route::put('/progress-update/{process}', [ChecklistController::class, 'progressUpdate']);
});

require_once __DIR__ . '/api.php';