import { Link, usePage } from "@inertiajs/react";
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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Layout from "@/Layouts/Layout";

const SchoolsIndex = () => {
    const { schools } = usePage().props;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Escolas
                    </h1>
                    <p className="text-gray-600">
                        Lista de todas as escolas cadastradas no sistema
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schools.map((school) => (
                        <Link
                            key={school.id}
                            href={`/escolas/${school.id}`}
                            className="block transition-transform hover:scale-[1.02]"
                        >
                            <Card className="h-full hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <CardTitle className="text-xl mb-2 flex items-center gap-2">
                                                <School className="w-5 h-5 text-blue-600" />
                                                {school.name}
                                            </CardTitle>
                                            {school.code && (
                                                <Badge variant="outline" className="mb-2">
                                                    Código: {school.code}
                                                </Badge>
                                            )}
                                        </div>
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
                                            <span className="truncate">{school.email}</span>
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
                                                {school.accountability_processes_count || 0} processos
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
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
