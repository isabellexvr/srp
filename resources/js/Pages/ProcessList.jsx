import { useState, useEffect } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {Select} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Plus, Search, Eye, Edit, Trash2, Loader2 } from "lucide-react";
import Layout from "@/Layouts/Layout";

const ProcessList = () => {
    const { processes: initialProcesses } = usePage().props;
    const [searchTerm, setSearchTerm] = useState("");
    const [yearFilter, setYearFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [processes, setProcesses] = useState(initialProcesses || []);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setProcesses(initialProcesses);
    }, [initialProcesses]);

    const handleSearch = () => {
        setLoading(true);
        const params = {};

        if (searchTerm) params.search = searchTerm;
        if (yearFilter !== "all") params.year = yearFilter;
        if (statusFilter !== "all") params.status = statusFilter;

        router.get("/processos", params, {
            preserveState: true,
            onFinish: () => setLoading(false),
        });
    };

    const handleDelete = (processId) => {
        if (confirm("Tem certeza que deseja excluir este processo?")) {
            router.delete(`/processos/${processId}`, {
                preserveState: true,
                onSuccess: () => {
                    // Atualiza a lista localmente
                    setProcesses((prev) =>
                        prev.filter((p) => p.id !== processId)
                    );
                },
            });
        }
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

    const filteredProcesses = processes.filter((process) => {
        const matchesSearch =
            !searchTerm ||
            process.process_number
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            process.school?.name
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesYear =
            yearFilter === "all" || process.year.toString() === yearFilter;
        const matchesStatus =
            statusFilter === "all" || process.status === statusFilter;

        return matchesSearch && matchesYear && matchesStatus;
    });

    return (
        <Layout>
            <div className="space-y-6">
                {/* Cabeçalho */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Processos
                        </h1>
                        <p className="text-gray-600">
                            Gerencie todos os processos de prestação de contas
                        </p>
                    </div>
                    <Link href="/processos/novo">
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                            <Plus className="h-4 w-4" />
                            Novo Processo
                        </Button>
                    </Link>
                </div>

                {/* Filtros */}
                <Card className="border border-gray-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                            Filtros
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Busque e filtre os processos
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                <Input
                                    placeholder="Buscar por número do processo ou escola..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    onKeyPress={(e) =>
                                        e.key === "Enter" && handleSearch()
                                    }
                                    className="pl-10"
                                />
                            </div>
                            <Select
                                value={yearFilter}
                                onValueChange={setYearFilter}
                                options={[
                                    { value: "all", label: "Todos os anos" },
                                    { value: "2024", label: "2024" },
                                    { value: "2023", label: "2023" },
                                    { value: "2022", label: "2022" },
                                ]}
                                placeholder="Ano"
                                className="w-full md:w-[180px]"
                            />
                            <Select
                                value={statusFilter}
                                onValueChange={setStatusFilter}
                                options={[
                                    { value: "all", label: "Todos os status" },
                                    { value: "rascunho", label: "Rascunho" },
                                    {
                                        value: "em_analise",
                                        label: "Em Análise",
                                    },
                                    { value: "aprovado", label: "Aprovado" },
                                    { value: "rejeitado", label: "Rejeitado" },
                                ]}
                                placeholder="Status"
                                className="w-full md:w-[180px]"
                            />
                            <Button
                                onClick={handleSearch}
                                disabled={loading}
                                className="gap-2"
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Search className="h-4 w-4" />
                                )}
                                Buscar
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Tabela de Processos */}
                <Card className="border border-gray-200 shadow-sm">
                    <CardContent className="p-0">
                        {filteredProcesses.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <Search className="h-12 w-12 mx-auto" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Nenhum processo encontrado
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {processes.length === 0
                                        ? "Comece criando seu primeiro processo de prestação de contas."
                                        : "Tente ajustar os filtros de busca."}
                                </p>
                                {processes.length === 0 && (
                                    <Link href="/processos/novo">
                                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                                            <Plus className="h-4 w-4" />
                                            Criar Primeiro Processo
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-gray-50 hover:bg-gray-50">
                                        <TableHead className="font-semibold text-gray-900">
                                            Nº Processo
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-900">
                                            Escola
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-900">
                                            Ano/Semestre
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-900">
                                            Status
                                        </TableHead>
                                        <TableHead className="font-semibold text-gray-900">
                                            Progresso
                                        </TableHead>
                                        <TableHead className="text-right font-semibold text-gray-900">
                                            Ações
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredProcesses.map((process) => (
                                        <TableRow
                                            key={process.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <TableCell className="font-medium text-gray-900">
                                                {process.process_number}
                                            </TableCell>
                                            <TableCell className="text-gray-700">
                                                {process.school?.name}
                                            </TableCell>
                                            <TableCell className="text-gray-700">
                                                {process.year}/
                                                {process.semester}º
                                            </TableCell>
                                            <TableCell>
                                                {getStatusBadge(process.status)}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                                                        <div
                                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                                            style={{
                                                                width: `${
                                                                    process.progress ||
                                                                    0
                                                                }%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <span className="text-sm text-gray-600 min-w-[40px]">
                                                        {process.progress || 0}%
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link
                                                        href={`/processos/${process.id}`}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Eye className="h-3 w-3" />
                                                        </Button>
                                                    </Link>
                                                    <Link
                                                        href={`/processos/${process.id}/editar`}
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Edit className="h-3 w-3" />
                                                        </Button>
                                                    </Link>
                                                    {process.status ===
                                                        "rascunho" && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    process.id
                                                                )
                                                            }
                                                        >
                                                            <Trash2 className="h-3 w-3" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default ProcessList;
