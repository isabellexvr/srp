import { Link, usePage, router } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Clock,
    CheckCircle,
    AlertCircle,
    Plus,
    Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import Layout from '@/Layouts/Layout'


const Dashboard = () => {
    const { auth } = usePage().props || {};
    const [stats, setStats] = useState({
        total: 0,
        em_andamento: 0,
        pendentes: 0,
        aprovados: 0,
    });
    const [recentProcesses, setRecentProcesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = () => {
        setLoading(true);
        setError(null);
        // Get stats
        router.get(
            "/dashboard/stats",
            {},
            {
                preserveState: true,
                onSuccess: (page) => {
                    setStats(page.props.stats || {});
                    // Get recent processes after stats
                    router.get(
                        "/dashboard/recent-processes",
                        {},
                        {
                            preserveState: true,
                            onSuccess: (page2) => {
                                setRecentProcesses(
                                    page2.props.recentProcesses || []
                                );
                                setLoading(false);
                            },
                            onError: (errors) => {
                                setError("Erro ao carregar processos");
                                setLoading(false);
                            },
                        }
                    );
                },
                onError: (errors) => {
                    setError("Erro ao carregar estatísticas");
                    setLoading(false);
                },
            }
        );
    };

    const getStatusBadge = (status) => {
        const variants = {
            rascunho: {
                label: "Rascunho",
                className: "bg-gray-100 text-gray-800",
            },
            em_analise: {
                label: "Em Análise",
                className: "bg-yellow-100 text-yellow-800",
            },
            aprovado: {
                label: "Aprovado",
                className: "bg-green-100 text-green-800",
            },
            rejeitado: {
                label: "Rejeitado",
                className: "bg-red-100 text-red-800",
            },
        };
        const variant = variants[status] || variants.rascunho;
        return <Badge className={variant.className}>{variant.label}</Badge>;
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Visão geral dos processos de prestação de contas
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        <p className="text-gray-600">Carregando dados...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Visão geral dos processos de prestação de contas
                        </p>
                    </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                    <div className="flex items-center gap-3">
                        <AlertCircle className="h-6 w-6 text-red-600" />
                        <div>
                            <h3 className="text-red-800 font-medium">
                                Erro ao carregar dados
                            </h3>
                            <p className="text-red-600 text-sm mt-1">{error}</p>
                        </div>
                    </div>
                    <Button
                        onClick={loadDashboardData}
                        className="mt-4 gap-2"
                        variant="outline"
                    >
                        <Loader2 className="h-4 w-4" />
                        Tentar Novamente
                    </Button>
                </div>
            </div>
        );
    }

    return (
      <Layout>
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        Dashboard
                    </h1>
                    <p className="text-gray-600">
                        {auth?.user?.school?.name
                            ? `Processos de ${auth.user.school.name}`
                            : "Visão geral dos processos de prestação de contas"}
                    </p>
                </div>
                <Link href="/processos/novo">
                    <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                        <Plus className="h-4 w-4" />
                        Novo Processo
                    </Button>
                </Link>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total de Processos
                        </CardTitle>
                        <FileText className="h-4 w-4 text-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-gray-600">
                            Todos os processos
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Em Andamento
                        </CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.em_andamento}
                        </div>
                        <p className="text-xs text-gray-600">
                            Aguardando conclusão
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pendentes
                        </CardTitle>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.pendentes}
                        </div>
                        <p className="text-xs text-gray-600">
                            Requerem atenção
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Aprovados
                        </CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {stats.aprovados}
                        </div>
                        <p className="text-xs text-gray-600">
                            Processos finalizados
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Processos Recentes */}
            <Card>
                <CardHeader>
                    <CardTitle>Processos Recentes</CardTitle>
                    <CardDescription>
                        Últimos processos cadastrados no sistema
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {recentProcesses.length === 0 ? (
                        <div className="text-center py-8">
                            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">
                                Nenhum processo encontrado
                            </p>
                            <Link href="/processos/novo">
                                <Button className="mt-4 gap-2 bg-blue-600 hover:bg-blue-700">
                                    <Plus className="h-4 w-4" />
                                    Criar Primeiro Processo
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {recentProcesses.map((process) => (
                                <div
                                    key={process.id}
                                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="space-y-1 flex-1">
                                        <div className="flex items-center gap-3">
                                            <p className="font-medium text-gray-900">
                                                {process.id}
                                            </p>
                                            {getStatusBadge(process.status)}
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {process.school}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            Semestre: {process.semester}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm font-medium">
                                                {process.progress}%
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Completo
                                            </p>
                                        </div>
                                        <Link href={`/processos/${process.id}`}>
                                            <Button variant="outline" size="sm">
                                                Visualizar
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
      </Layout>
    );
};

export default Dashboard;
