import { useState, useEffect } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Upload, Save, Send, Plus, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Layout from "@/Layouts/Layout";

// Helper function for status badge
const getStatusBadge = (status) => {
    const variants = {
        pending: {
            label: "Pendente",
            className: "bg-gray-100 text-gray-800 border border-gray-300",
        },
        completed: {
            label: "Concluído",
            className: "bg-green-100 text-green-800 border border-green-300",
        },
        na: {
            label: "N/A",
            className: "bg-blue-100 text-blue-800 border border-blue-300",
        },
    };
    const variant = variants[status] || variants.pending;
    return (
        <Badge className={cn("text-xs font-medium", variant.className)}>
            {variant.label}
        </Badge>
    );
};

// Componente para item individual do checklist
const ChecklistItem = ({
    item,
    onStatusChange,
    onSeiNumberChange,
    formData = {},
}) => {
    const currentStatus = formData.status || item.status || "pending";
    const currentSeiNumber = formData.sei_number || item.sei_number || "";

    return (
        <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-white">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <Label className="text-base font-medium text-gray-900">
                            {item.item_number}. {item.description}
                        </Label>
                        {getStatusBadge(currentStatus)}
                    </div>
                    {item.observations && (
                        <p className="text-sm text-gray-600 mt-1">
                            {item.observations}
                        </p>
                    )}
                </div>
            </div>

            <div className="space-y-4 ml-6 border-l-2 border-gray-200 pl-6">
                <div>
                    <Label className="text-sm font-medium text-gray-700 mb-3 block">
                        Status do Documento
                    </Label>
                    <RadioGroup
                        value={currentStatus}
                        onValueChange={(value) =>
                            onStatusChange(item.id, value)
                        }
                        className="flex gap-6 flex-wrap"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="completed"
                                id={`${item.id}-completed`}
                            />
                            <Label
                                htmlFor={`${item.id}-completed`}
                                className="font-normal text-gray-700 cursor-pointer"
                            >
                                Concluído
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem
                                value="pending"
                                id={`${item.id}-pending`}
                            />
                            <Label
                                htmlFor={`${item.id}-pending`}
                                className="font-normal text-gray-700 cursor-pointer"
                            >
                                Pendente
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="na" id={`${item.id}-na`} />
                            <Label
                                htmlFor={`${item.id}-na`}
                                className="font-normal text-gray-700 cursor-pointer"
                            >
                                Não se aplica
                            </Label>
                        </div>
                    </RadioGroup>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Label
                            htmlFor={`sei-${item.id}`}
                            className="text-sm font-medium text-gray-700 mb-2 block"
                        >
                            Número do Documento SEI
                        </Label>
                        <Input
                            id={`sei-${item.id}`}
                            placeholder="Ex: 12345678"
                            value={currentSeiNumber}
                            onChange={(e) =>
                                onSeiNumberChange(item.id, e.target.value)
                            }
                            className="max-w-xs"
                        />
                    </div>

                    <div>
                        <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            Arquivo do Documento
                        </Label>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Upload className="h-4 w-4" />
                            Upload Arquivo
                        </Button>
                        {item.document_path && (
                            <p className="text-xs text-green-600 mt-1">
                                Arquivo já enviado
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Componente para documentos de compras
const PurchaseDocuments = ({ purchase }) => (
    <div className="border border-gray-200 rounded-lg p-4 space-y-4 bg-white">
        <div className="flex items-center justify-between">
            <div>
                <h4 className="font-semibold text-gray-900 text-lg">
                    {purchase.description}
                </h4>
                <p className="text-sm text-gray-600 mt-1">
                    Fornecedor: {purchase.supplier_name} • Valor: R${" "}
                    {purchase.value}
                </p>
            </div>
            <Badge className="bg-blue-100 text-blue-800 border-blue-300">
                Compra {purchase.purchase_number}
            </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Orçamentos (mínimo 3) */}
            <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                    Orçamentos (3 empresas)
                </Label>
                <div className="space-y-2">
                    {[1, 2, 3].map((num) => (
                        <Button
                            key={num}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start gap-2 text-sm"
                        >
                            <Upload className="h-4 w-4" />
                            Orçamento Empresa {num}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Certidões Negativas */}
            <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                    Certidões Negativas
                </Label>
                <div className="space-y-2">
                    {[
                        "Municipal",
                        "Estadual",
                        "Federal",
                        "FGTS",
                        "Trabalhista",
                    ].map((type) => (
                        <Button
                            key={type}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start gap-2 text-sm"
                        >
                            <Upload className="h-4 w-4" />
                            Certidão {type}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Outros documentos específicos */}
            <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">
                    Documentos Obrigatórios
                </Label>
                <div className="space-y-2">
                    {[
                        "CNPJ Fornecedor",
                        "Ata de Resultado",
                        "Consolidação de Preços",
                        "Ordem de Compra",
                        "Contrato",
                        "Nota Fiscal",
                        "Recibo de Quitação",
                        "Comprovante Pagamento",
                    ].map((doc) => (
                        <Button
                            key={doc}
                            variant="outline"
                            size="sm"
                            className="w-full justify-start gap-2 text-sm"
                        >
                            <Upload className="h-4 w-4" />
                            {doc}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

const Checklist = () => {
    const { process, checklistItems = [], purchases = [] } = usePage().props;
    const [openSections, setOpenSections] = useState(["documentos-gerais"]);
    const [progress, setProgress] = useState(0);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    // Calcular progresso baseado nos itens concluídos
    useEffect(() => {
        const completed = checklistItems.filter(item => item.status === 'completed').length;
        const total = checklistItems.length;
        setProgress(total > 0 ? Math.round((completed / total) * 100) : 0);
    }, [checklistItems]);

    const toggleSection = (sectionId) => {
        setOpenSections((prev) =>
            prev.includes(sectionId)
                ? prev.filter((id) => id !== sectionId)
                : [...prev, sectionId]
        );
    };

    const handleStatusChange = (itemId, status) => {
        setFormData((prev) => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                status,
                updated_at: new Date().toISOString(),
            },
        }));
    };

    const handleSeiNumberChange = (itemId, seiNumber) => {
        setFormData((prev) => ({
            ...prev,
            [itemId]: {
                ...prev[itemId],
                sei_number: seiNumber,
            },
        }));
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            await router.post(
                `/processos/${process.id}/checklist/update`,
                formData,
                {
                    preserveState: true,
                }
            );
        } catch (error) {
            console.error("Erro ao salvar:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = () => {
        if (progress < 100) {
            alert(
                "Complete todos os itens obrigatórios antes de enviar para análise."
            );
            return;
        }
        if (
            confirm(
                "Tem certeza que deseja enviar para análise? Após envio não será possível editar."
            )
        ) {
            router.post(
                `/processos/${process.id}/submit`,
                {},
                {
                    onSuccess: () => {
                        router.visit("/processos");
                    },
                }
            );
        }
    };

    // Agrupar itens por seção
    const sections = {
        "documentos-gerais": {
            title: "Documentos Gerais (Itens 1-4)",
            items: checklistItems.filter((item) =>
                ["1", "2", "3", "4"].includes(item.item_number)
            ),
            completed: checklistItems.filter(
                (item) =>
                    ["1", "2", "3", "4"].includes(item.item_number) &&
                    item.status === "completed"
            ).length,
        },
        compras: {
            title: "Documentos de Compras (Itens 5.1 a 5.30)",
            items: purchases,
            completed: purchases.filter(
                (purchase) => purchase.status === "completed"
            ).length,
        },
        complementares: {
            title: "Documentos Complementares (Itens 7.1-7.2)",
            items: checklistItems.filter((item) =>
                ["7.1", "7.2"].includes(item.item_number)
            ),
            completed: checklistItems.filter(
                (item) =>
                    ["7.1", "7.2"].includes(item.item_number) &&
                    item.status === "completed"
            ).length,
        },
        extratos: {
            title: "Extratos Bancários (Itens 8.1-8.2)",
            items: checklistItems.filter((item) =>
                ["8.1", "8.2"].includes(item.item_number)
            ),
            completed: checklistItems.filter(
                (item) =>
                    ["8.1", "8.2"].includes(item.item_number) &&
                    item.status === "completed"
            ).length,
        },
        outros: {
            title: "Outros Documentos (Itens 9-15)",
            items: checklistItems.filter(
                (item) =>
                    !["1", "2", "3", "4", "7.1", "7.2", "8.1", "8.2"].includes(
                        item.item_number
                    ) && !item.item_number.startsWith("5.")
            ),
            completed: checklistItems.filter(
                (item) =>
                    !["1", "2", "3", "4", "7.1", "7.2", "8.1", "8.2"].includes(
                        item.item_number
                    ) &&
                    !item.item_number.startsWith("5.") &&
                    item.status === "completed"
            ).length,
        },
    };

    return (
        <Layout>
            <div className="space-y-6 max-w-6xl mx-auto">
                {/* Cabeçalho */}
                <div className="flex items-center gap-4">
                    <Link href="/processos">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900">
                            Checklist de Documentos
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Processo: <strong>{process.process_number}</strong> - {process.school.name}
                        </p>
                    </div>
                </div>

                {/* Progresso */}
                <Card className="border border-gray-200 shadow-sm">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg font-semibold text-gray-900">
                                    Progresso Geral
                                </CardTitle>
                                <CardDescription className="text-gray-600">
                                    Complete todos os itens obrigatórios do checklist
                                </CardDescription>
                            </div>
                            <Badge className={cn(
                                "text-sm font-semibold",
                                progress === 100
                                    ? "bg-green-100 text-green-800 border-green-300"
                                    : "bg-blue-100 text-blue-800 border-blue-300"
                            )}>
                                {progress}% Completo
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Progress value={progress} className="mb-2" />
                        <div className="flex justify-between text-sm text-gray-600">
                            <span>
                                {checklistItems.filter((item) => item.status === "completed").length} de {checklistItems.length} itens concluídos
                            </span>
                            <span>{purchases.length} compras cadastradas</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Seções do Checklist */}
                <Accordion>
                    {Object.entries(sections).map(([sectionKey, section]) => {
                        const isOpen = openSections.includes(sectionKey);
                        const hasItems = section.items && section.items.length > 0;

                        return (
                            <AccordionItem key={sectionKey}>
                                <AccordionTrigger
                                    isOpen={isOpen}
                                    onClick={() => toggleSection(sectionKey)}
                                >
                                    <div className="flex items-center justify-between w-full pr-4">
                                        <div className="flex items-center gap-3">
                                            <CardTitle className="text-lg font-semibold text-gray-900">
                                                {section.title}
                                            </CardTitle>
                                            {!hasItems && sectionKey !== "compras" && (
                                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">
                                                    Vazio
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-3">
                                            {hasItems && (
                                                <Badge variant="outline" className="bg-gray-50 text-gray-700">
                                                    {section.completed}/{section.items.length}
                                                </Badge>
                                            )}
                                            {sectionKey === "compras" && (
                                                <Link href={`/processos/${process.id}/compras`}>
                                                    <Button size="sm" variant="outline" className="gap-1 h-8">
                                                        <Plus className="h-3 w-3" />
                                                        Gerenciar
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </AccordionTrigger>

                                <AccordionContent isOpen={isOpen}>
                                    <div className="space-y-4">
                                        {!hasItems ? (
                                            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                                                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                                <p className="text-gray-600 mb-4">
                                                    {sectionKey === "compras"
                                                        ? "Nenhuma compra cadastrada"
                                                        : "Nenhum item disponível"}
                                                </p>
                                                {sectionKey === "compras" && (
                                                    <Link href={`/processos/${process.id}/compras`}>
                                                        <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
                                                            <Plus className="h-4 w-4" />
                                                            Cadastrar Primeira Compra
                                                        </Button>
                                                    </Link>
                                                )}
                                            </div>
                                        ) : sectionKey === "compras" ? (
                                            <div className="space-y-4">
                                                {section.items.map((purchase) => (
                                                    <PurchaseDocuments key={purchase.id} purchase={purchase} />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                {section.items.map((item) => (
                                                    <ChecklistItem
                                                        key={item.id}
                                                        item={item}
                                                        onStatusChange={handleStatusChange}
                                                        onSeiNumberChange={handleSeiNumberChange}
                                                        formData={formData[item.id]}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        );
                    })}
                </Accordion>

                {/* Botões de Ação */}
                <div className="flex gap-4 justify-end pt-6 border-t">
                    <Button
                        variant="outline"
                        onClick={handleSave}
                        className="gap-2"
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
                        ) : (
                            <Save className="h-4 w-4" />
                        )}
                        Salvar Progresso
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        className="gap-2 bg-blue-600 hover:bg-blue-700"
                        disabled={progress < 100 || loading}
                    >
                        <Send className="h-4 w-4" />
                        Enviar para Análise
                    </Button>
                </div>
            </div>
        </Layout>
    );
};

export default Checklist;