import { Link, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    School,
    Users,
    FileText,
    MapPin,
    Phone,
    Mail,
    User,
    ArrowLeft,
    Calendar,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Layout from "@/Layouts/Layout";

const SchoolShow = () => {
    const { school } = usePage().props;

    const getStatusBadge = (status) => {
        const variants = {
            rascunho: { color: "bg-gray-500", label: "Rascunho" },
            em_andamento: { color: "bg-blue-500", label: "Em Andamento" },
            enviado: { color: "bg-yellow-500", label: "Enviado" },
            em_analise: { color: "bg-orange-500", label: "Em Análise" },
            aprovado: { color: "bg-green-500", label: "Aprovado" },
            rejeitado: { color: "bg-red-500", label: "Rejeitado" },
        };

        const variant = variants[status] || variants.rascunho;
        return (
            <Badge className={`${variant.color} text-white`}>
                {variant.label}
            </Badge>
        );
    };

    const getRoleBadge = (role) => {
        const variants = {
            admin: { color: "bg-purple-500", label: "Administrador" },
            school_admin: { color: "bg-blue-500", label: "Gestor Escolar" },
            fiscal_council: { color: "bg-green-500", label: "Conselho Fiscal" },
        };

        const variant = variants[role] || { color: "bg-gray-500", label: role };
        return (
            <Badge className={`${variant.color} text-white`}>
                {variant.label}
            </Badge>
        );
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-6">
                    <Link href="/escolas">
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar para Escolas
                        </Button>
                    </Link>
                    
                    <div className="flex items-start gap-4">
                        <School className="w-12 h-12 text-blue-600" />
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {school.name}
                            </h1>
                            {school.code && (
                                <Badge variant="outline">Código: {school.code}</Badge>
                            )}
                        </div>
                    </div>
                </div>

                {/* Informações da Escola */}
                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Informações da Escola</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {school.director_name && (
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Diretor(a)</p>
                                    <p className="font-medium">{school.director_name}</p>
                                </div>
                            </div>
                        )}

                        {school.address && (
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                                <div>
                                    <p className="text-sm text-gray-500">Endereço</p>
                                    <p className="font-medium">{school.address}</p>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {school.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Telefone</p>
                                        <p className="font-medium">{school.phone}</p>
                                    </div>
                                </div>
                            )}

                            {school.email && (
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">E-mail</p>
                                        <p className="font-medium">{school.email}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Usuários */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Usuários ({school.users_count})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {school.users && school.users.length > 0 ? (
                                <div className="space-y-3">
                                    {school.users.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                        >
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>
                                            {getRoleBadge(user.role)}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    Nenhum usuário cadastrado
                                </p>
                            )}
                        </CardContent>
                    </Card>

                    {/* Processos de Prestação de Contas */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5" />
                                Processos ({school.accountability_processes_count})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {school.accountability_processes && school.accountability_processes.length > 0 ? (
                                <div className="space-y-3">
                                    {school.accountability_processes.map((process) => (
                                        <Link
                                            key={process.id}
                                            href={`/processos-show/${process.id}`}
                                            className="block p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <p className="font-medium">
                                                    {process.year} - {process.semester}º Semestre
                                                </p>
                                                {getStatusBadge(process.status)}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Calendar className="w-4 h-4" />
                                                Criado em {new Date(process.created_at).toLocaleDateString('pt-BR')}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">
                                    Nenhum processo cadastrado
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default SchoolShow;
