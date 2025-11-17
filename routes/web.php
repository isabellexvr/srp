<?php

use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use Illuminate\Support\Facades\Auth;
Route::get('/', function () {
    if (Auth::check()) {
        return redirect('/dashboard');
    }
    return Inertia::render('Login');
});


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
});

Route::get('/cnpj', [TestController::class, 'index'])->name('index');


require_once __DIR__.'/api.php';