import { Link, router, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
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
    Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Layout from "@/Layouts/Layout";

const SchoolsIndex = () => {
    const { schools } = usePage().props;

    const handleDelete = (schoolId) => {
        if (!window.confirm("Tem certeza que deseja excluir esta escola?")) {
            return;
        }

        router.delete(`/escolas/${schoolId}`);
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Escolas
                        </h1>
                        <p className="text-gray-600">
                            Lista de todas as escolas cadastradas no sistema
                        </p>
                    </div>
                    <Link href="/escolas/create">
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                            <School className="h-4 w-4" />
                            Nova Escola
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schools.map((school) => (
                        <Card
                            key={school.id}
                            className="h-full hover:shadow-lg transition-shadow"
                        >
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <Link
                                            href={`/escolas/${school.id}`}
                                            className="block transition-transform hover:scale-[1.02]"
                                        >
                                            <CardTitle className="text-xl mb-2 flex items-center gap-2">
                                                <School className="w-5 h-5 text-blue-600" />
                                                {school.name}
                                            </CardTitle>
                                        </Link>
                                        {school.code && (
                                            <Badge
                                                variant="outline"
                                                className="mb-2"
                                            >
                                                Código: {school.code}
                                            </Badge>
                                        )}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                        onClick={() => handleDelete(school.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                {school.director_name && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <User className="w-4 h-4" />
                                        <span>{school.director_name}</span>
                                    </div>
                                )}

                                {school.address && (
                                    <div className="flex items-start gap-2 text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 mt-0.5" />
                                        <span>{school.address}</span>
                                    </div>
                                )}

                                {school.phone && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Phone className="w-4 h-4" />
                                        <span>{school.phone}</span>
                                    </div>
                                )}

                                {school.email && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Mail className="w-4 h-4" />
                                        <span className="truncate">
                                            {school.email}
                                        </span>
                                    </div>
                                )}

                                <div className="pt-4 mt-4 border-t flex gap-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Users className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600">
                                            {school.users_count || 0} usuários
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <FileText className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-600">
                                            {school.accountability_processes_count ||
                                                0}{" "}
                                            processos
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {schools.length === 0 && (
                    <Card>
                        <CardContent className="py-12 text-center">
                            <School className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">
                                Nenhuma escola cadastrada no sistema
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </Layout>
    );
};

export default SchoolsIndex;
