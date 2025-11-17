<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProcessController;
use App\Http\Controllers\ChecklistController;
use App\Http\Controllers\PurchaseController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\Api\SchoolController;

// Autenticação
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::middleware(['auth:sanctum'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/recent-processes', [DashboardController::class, 'recentProcesses']);
});

// Processos
Route::apiResource('processes', ProcessController::class)->middleware('auth:sanctum');
Route::get('/schools/{school}/processes', [ProcessController::class, 'getBySchool'])->middleware('auth:sanctum');


Route::middleware(['auth'])->group(function () {
    // Processos
    Route::get('/processos', [ProcessController::class, 'index'])->name('processos.index');
    Route::get('/processos/novo', [ProcessController::class, 'create'])->name('processos.create');
    Route::post('/processos', [ProcessController::class, 'store'])->name('processos.store');
    Route::post('/processos/store-and-checklist', [ProcessController::class, 'storeAndChecklist']);
    Route::delete('/processos/{process}', [ProcessController::class, 'destroy'])->name('processos.destroy');
});



// Documentos
Route::post('/processes/{process}/documents/upload', [DocumentController::class, 'uploadGeneralDocument'])->middleware('auth:sanctum');
Route::post('/purchases/{purchase}/documents/upload', [DocumentController::class, 'uploadPurchaseDocument'])->middleware('auth:sanctum');
Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('/documents/{document}/download', [DocumentController::class, 'download'])->middleware('auth:sanctum');

// Escolas
Route::get('/schools', [SchoolController::class, 'index'])->middleware('auth:sanctum');
