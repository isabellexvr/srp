import React, { useState } from 'react';
import Layout from '@/Layouts/Layout'

export default function Dashboard({ dadosCnpj, error, cnpjPesquisado }) {
    const [cnpj, setCnpj] = useState(cnpjPesquisado || '');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (cnpj.trim()) {
            // O Inertia vai fazer uma nova requisição para a rota com o CNPJ
            window.location.href = `/cnpj?cnpj=${encodeURIComponent(cnpj)}`;
        }
    };

    const formatarCnpj = (cnpj) => {
        return cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5");
    };

    return (
        <Layout>

                   <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Consulta de CNPJ
                </h1>
                
                {/* Formulário de Consulta */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <div className="flex gap-4">
                        <input
                            type="text"
                            value={cnpj}
                            onChange={(e) => setCnpj(e.target.value)}
                            placeholder="Digite o CNPJ (com ou sem pontuação)"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Consultar
                        </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                        Exemplo: 00.000.000/0001-91 ou 00000000000191
                    </p>
                </form>

                {/* Mensagem de Erro */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Resultados da Consulta */}
                {dadosCnpj && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            Dados da Empresa
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">CNPJ</label>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {formatarCnpj(dadosCnpj.cnpj)}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Razão Social</label>
                                    <p className="text-lg text-gray-900">{dadosCnpj.razao_social}</p>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Nome Fantasia</label>
                                    <p className="text-lg text-gray-900">
                                        {dadosCnpj.nome_fantasia || 'Não informado'}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Situação Cadastral</label>
                                    <p className={`text-lg font-semibold ${
                                        dadosCnpj.situacao_cadastral === 'Ativa' 
                                            ? 'text-green-600' 
                                            : 'text-red-600'
                                    }`}>
                                        {dadosCnpj.situacao_cadastral}
                                    </p>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Data de Abertura</label>
                                    <p className="text-lg text-gray-900">
                                        {new Date(dadosCnpj.data_inicio_atividade).toLocaleDateString('pt-BR')}
                                    </p>
                                </div>
                                
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Endereço</label>
                                    <p className="text-lg text-gray-900">
                                        {dadosCnpj.logradouro}, {dadosCnpj.numero}
                                    </p>
                                    <p className="text-gray-600">
                                        {dadosCnpj.bairro} - {dadosCnpj.municipio}/{dadosCnpj.uf}
                                    </p>
                                    <p className="text-gray-600">CEP: {dadosCnpj.cep}</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Botão para nova consulta */}
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <button
                                onClick={() => {
                                    setCnpj('');
                                    window.location.href = '/cnpj';
                                }}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                            >
                                Nova Consulta
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div> 
        </Layout>

    );
}