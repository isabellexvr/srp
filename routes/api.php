<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ChecklistController;

// Autenticação
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::get('/login', [AuthController::class, 'showLoginForm'])->name('login.form');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware(['auth'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Processos
    Route::get('/processos', [ProcessController::class, 'index'])->name('processos.index');
    Route::get('/processos/novo', [ProcessController::class, 'create'])->name('processos.create');
    Route::post('/processos', [ProcessController::class, 'store'])->name('processos.store');
    Route::post('/processos/store-and-checklist', [ProcessController::class, 'storeAndChecklist']);
    Route::delete('/processos/{process}', [ProcessController::class, 'destroy'])->name('processos.destroy');
    
    // Checklist
    Route::get('/processos/{process}/checklist', [ChecklistController::class, 'show'])->name('checklist.show');
    Route::put('/processos/{process}/checklist/{item}', [ChecklistController::class, 'updateItem']);
    Route::post('/processos/{process}/checklist/bulk-update', [ChecklistController::class, 'bulkUpdate']);
});

// API Routes (se ainda precisar)
Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/recent-processes', [DashboardController::class, 'recentProcesses']);
});