import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select } from "@/components/ui/select";
import { ArrowLeft, Save, PlayCircle, Loader2 } from "lucide-react";
import Layout from '@/Layouts/Layout';

const ProcessForm = () => {
  const { schools } = usePage().props;
  const [formData, setFormData] = useState({
    school_id: "",
    year: new Date().getFullYear().toString(),
    semester: "2",
    president_name: "",
    treasurer_name: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Limpar erro do campo quando usuário modificar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: null
      }));
    }
  };

  const schoolOptions = schools?.map(school => ({
    value: school.id.toString(),
    label: school.name
})) || [];

  const handleSubmit = (action) => {
    setLoading(true);
    setErrors({});

    const url = action === 'checklist' ? '/processos/store-and-checklist' : '/processos';

    router.post(url, formData, {
      onSuccess: (page) => {
        setLoading(false);
        if (action === 'checklist' && page.props.process) {
          router.visit(`/processos/${page.props.process.id}/checklist`);
        }
      },
      onError: (errors) => {
        setErrors(errors);
        setLoading(false);
      },
      preserveState: false
    });
  };

  return (
    <Layout>
      <div className="space-y-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/processos">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Novo Processo</h1>
            <p className="text-gray-600">Preencha os dados para criar um novo processo</p>
          </div>
        </div>

        <Card className="border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-900">Dados do Processo</CardTitle>
            <CardDescription className="text-gray-600">
              Informações básicas do processo de prestação de contas
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Escola */}
            <div className="space-y-2">
              <Label htmlFor="school_id" className="text-sm font-medium text-gray-900">
                Escola *
              </Label>
                <Select
                    value={formData.school_id}
                    onValueChange={(value) => handleChange('school_id', value)}
                    options={schoolOptions}
                    placeholder="Selecione a escola"
                    error={errors.school_id}
                    className={errors.school_id ? 'border-red-500' : ''}
                />
              {errors.school_id && (
                <p className="text-sm text-red-600">{errors.school_id}</p>
              )}
            </div>

            {/* Ano e Semestre */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-medium text-gray-900">
                  Ano *
                </Label>
                <Input
                  id="year"
                  type="number"
                  value={formData.year}
                  onChange={(e) => handleChange('year', e.target.value)}
                  min="2020"
                  max="2030"
                  className={errors.year ? 'border-red-500' : ''}
                  disabled={loading}
                />
                {errors.year && (
                  <p className="text-sm text-red-600">{errors.year}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-900">
                  Semestre *
                </Label>
                <RadioGroup 
                  value={formData.semester} 
                  onValueChange={(value) => handleChange('semester', value)}
                  className="flex items-center space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="sem1" disabled={loading} />
                    <Label htmlFor="sem1" className="font-normal text-gray-700 cursor-pointer">
                      1º Semestre
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="sem2" disabled={loading} />
                    <Label htmlFor="sem2" className="font-normal text-gray-700 cursor-pointer">
                      2º Semestre
                    </Label>
                  </div>
                </RadioGroup>
                {errors.semester && (
                  <p className="text-sm text-red-600">{errors.semester}</p>
                )}
              </div>
            </div>

            {/* Presidente */}
            <div className="space-y-2">
              <Label htmlFor="president_name" className="text-sm font-medium text-gray-900">
                Nome do Presidente *
              </Label>
              <Input
                id="president_name"
                type="text"
                placeholder="Nome completo do presidente do conselho"
                value={formData.president_name}
                onChange={(e) => handleChange('president_name', e.target.value)}
                className={errors.president_name ? 'border-red-500' : ''}
                disabled={loading}
              />
              {errors.president_name && (
                <p className="text-sm text-red-600">{errors.president_name}</p>
              )}
            </div>

            {/* Tesoureiro */}
            <div className="space-y-2">
              <Label htmlFor="treasurer_name" className="text-sm font-medium text-gray-900">
                Nome do Tesoureiro *
              </Label>
              <Input
                id="treasurer_name"
                type="text"
                placeholder="Nome completo do tesoureiro"
                value={formData.treasurer_name}
                onChange={(e) => handleChange('treasurer_name', e.target.value)}
                className={errors.treasurer_name ? 'border-red-500' : ''}
                disabled={loading}
              />
              {errors.treasurer_name && (
                <p className="text-sm text-red-600">{errors.treasurer_name}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="flex gap-4 justify-end pt-6">
          <Link href="/processos">
            <Button variant="outline" disabled={loading}>
              Cancelar
            </Button>
          </Link>
          <Button 
            variant="outline" 
            onClick={() => handleSubmit("draft")} 
            className="gap-2"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Salvar Rascunho
          </Button>
          <Button 
            onClick={() => handleSubmit("checklist")} 
            className="gap-2 bg-blue-600 hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <PlayCircle className="h-4 w-4" />
            )}
            Iniciar Checklist
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ProcessForm;