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
Route::post('/login', [AuthController::class, 'login']);
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

// Checklist
Route::get('/processes/{process}/checklist', [ChecklistController::class, 'show'])->middleware('auth:sanctum');
Route::put('/processes/{process}/checklist/{item}', [ChecklistController::class, 'updateItem'])->middleware('auth:sanctum');
Route::post('/processes/{process}/checklist/bulk-update', [ChecklistController::class, 'bulkUpdate'])->middleware('auth:sanctum');

// Compras
Route::get('/processes/{process}/purchases', [PurchaseController::class, 'index'])->middleware('auth:sanctum');
Route::post('/processes/{process}/purchases', [PurchaseController::class, 'store'])->middleware('auth:sanctum');
Route::put('/processes/{process}/purchases/{purchase}', [PurchaseController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/processes/{process}/purchases/{purchase}', [PurchaseController::class, 'destroy'])->middleware('auth:sanctum');
Route::post('/processes/{process}/purchases/bulk-upload', [PurchaseController::class, 'bulkUpload'])->middleware('auth:sanctum');

// Documentos
Route::post('/processes/{process}/documents/upload', [DocumentController::class, 'uploadGeneralDocument'])->middleware('auth:sanctum');
Route::post('/purchases/{purchase}/documents/upload', [DocumentController::class, 'uploadPurchaseDocument'])->middleware('auth:sanctum');
Route::delete('/documents/{document}', [DocumentController::class, 'destroy'])->middleware('auth:sanctum');
Route::get('/documents/{document}/download', [DocumentController::class, 'download'])->middleware('auth:sanctum');

// Escolas
Route::get('/schools', [SchoolController::class, 'index'])->middleware('auth:sanctum');
