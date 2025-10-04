<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class TestController extends Controller
{
    public function index(Request $request)
    {
        $dadosCnpj = null;
        $cnpj = $request->input('cnpj');
        $error = null;

        // Se tem CNPJ na requisição, faz a consulta
        if ($cnpj) {
            // Remove caracteres não numéricos
            $cnpj = preg_replace('/[^0-9]/', '', $cnpj);
            
            // Valida se tem 14 dígitos
            if (strlen($cnpj) === 14) {
                try {
                    $url = "https://minhareceita.org/{$cnpj}";
                    $response = Http::timeout(30)->get($url);

                    if ($response->successful()) {
                        $dadosCnpj = $response->json();
                    } else {
                        $error = 'CNPJ não encontrado ou erro na consulta.';
                    }
                } catch (\Exception $e) {
                    $error = 'Erro ao conectar com o serviço de consulta.';
                }
            } else {
                $error = 'CNPJ deve ter 14 dígitos.';
            }
        }

        return Inertia::render('Dashboard', [
            'dadosCnpj' => $dadosCnpj,
            'error' => $error,
            'cnpjPesquisado' => $cnpj
        ]);
    }
}