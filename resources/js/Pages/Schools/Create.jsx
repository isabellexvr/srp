import { useState } from "react";
import { router, Link } from "@inertiajs/react";
import Layout from "@/Layouts/Layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { School, ArrowLeft } from "lucide-react";

const SchoolsCreate = () => {
    const [form, setForm] = useState({
        name: "",
        code: "",
        director_name: "",
        address: "",
        phone: "",
        email: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        router.post("/escolas", form, {
            onError: (errs) => setErrors(errs),
        });
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 max-w-3xl">
                <Link href="/escolas">
                    <Button variant="ghost" className="mb-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Voltar para Escolas
                    </Button>
                </Link>

                <Card>
                    <CardHeader className="flex items-center gap-3">
                        <School className="w-6 h-6 text-blue-600" />
                        <CardTitle>Nova Escola</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Nome da Escola *</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="code">Código</Label>
                                    <Input
                                        id="code"
                                        name="code"
                                        value={form.code}
                                        onChange={handleChange}
                                    />
                                    {errors.code && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.code}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="director_name">
                                        Diretor(a)
                                    </Label>
                                    <Input
                                        id="director_name"
                                        name="director_name"
                                        value={form.director_name}
                                        onChange={handleChange}
                                    />
                                    {errors.director_name && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.director_name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="address">Endereço</Label>
                                <Input
                                    id="address"
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                />
                                {errors.address && (
                                    <p className="text-sm text-red-600 mt-1">
                                        {errors.address}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="phone">Telefone</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                    {errors.phone && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.phone}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && (
                                        <p className="text-sm text-red-600 mt-1">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <Link href="/escolas">
                                    <Button type="button" variant="outline">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Salvar Escola
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default SchoolsCreate;
