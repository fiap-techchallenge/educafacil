"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import {
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  CheckCircle,
  ArrowLeft,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";
import { TopNavigation } from "@/components/top-navigation";
import { cn } from "@/lib/utils";

interface Activity {
  id: number;
  title: string;
  description: string;
  subject: string;
  gradeLevel: string;
  type: string;
  uploadDate: string;
  downloads: number;
  rating: number;
  status: string;
  fileName?: string;
  fileSize?: string;
  tags?: string[];
}

interface FormData {
  title: string;
  description: string;
  subject: string;
  gradeLevel: string;
  activityType: string;
  file: File | null;
  tags: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  subject?: string;
  gradeLevel?: string;
  activityType?: string;
  file?: string;
  tags?: string;
}

// Mock data - in real app, this would come from API
const mockActivities: Record<number, Activity> = {
  1: {
    id: 1,
    title: "Exercícios de Multiplicação - Tabuada do 7",
    description:
      "Esta atividade foi desenvolvida para auxiliar os alunos do 3º ano na fixação da tabuada do 7. Contém exercícios variados, desde cálculos simples até problemas contextualizados que ajudam na compreensão prática da multiplicação.",
    subject: "Matemática",
    gradeLevel: "3º Ano",
    type: "Exercício",
    uploadDate: "15 Mar 2024",
    downloads: 156,
    rating: 4.8,
    status: "Aprovada",
    fileName: "tabuada-7-exercicios.pdf",
    fileSize: "2.3 MB",
    tags: ["multiplicação", "tabuada", "matemática básica"],
  },
  2: {
    id: 2,
    title: "Plano de Aula - Frações",
    description:
      "Plano de aula completo sobre frações para o 4º ano, incluindo objetivos, metodologia, recursos necessários e avaliação. Aborda conceitos básicos de frações através de atividades práticas e lúdicas.",
    subject: "Matemática",
    gradeLevel: "4º Ano",
    type: "Plano de Aula",
    uploadDate: "10 Mar 2024",
    downloads: 89,
    rating: 4.9,
    status: "Aprovada",
    fileName: "plano-aula-fracoes.docx",
    fileSize: "1.8 MB",
    tags: ["frações", "plano de aula", "matemática"],
  },
};

export default function EditActivityPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const unwrappedParams = use(params as unknown as Promise<{ id: string }>);
  const activityId = Number.parseInt(unwrappedParams.id);
  const activity = mockActivities[activityId];

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    subject: "",
    gradeLevel: "",
    activityType: "",
    file: null,
    tags: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const subjectOptions = [
    { value: "Matemática", label: "Matemática" },
    { value: "Português", label: "Português" },
    { value: "Ciências", label: "Ciências" },
    { value: "História", label: "História" },
    { value: "Geografia", label: "Geografia" },
    { value: "Artes", label: "Artes" },
    { value: "Educação Física", label: "Educação Física" },
    { value: "Inglês", label: "Inglês" },
  ];

  const gradeLevelOptions = [
    { value: "1º Ano", label: "1º Ano" },
    { value: "2º Ano", label: "2º Ano" },
    { value: "3º Ano", label: "3º Ano" },
    { value: "4º Ano", label: "4º Ano" },
    { value: "5º Ano", label: "5º Ano" },
    { value: "6º Ano", label: "6º Ano" },
    { value: "7º Ano", label: "7º Ano" },
    { value: "8º Ano", label: "8º Ano" },
    { value: "9º Ano", label: "9º Ano" },
  ];

  const activityTypeOptions = [
    { value: "Prova", label: "Prova" },
    { value: "Exercício", label: "Exercício" },
    { value: "Plano de Aula", label: "Plano de Aula" },
    { value: "Projeto", label: "Projeto" },
    { value: "Jogo Educativo", label: "Jogo Educativo" },
    { value: "Apresentação", label: "Apresentação" },
  ];

  // Load activity data on component mount
  useEffect(() => {
    if (!activity) {
      router.push("/profile");
      return;
    }

    setFormData({
      title: activity.title,
      description: activity.description,
      subject: activity.subject,
      gradeLevel: activity.gradeLevel,
      activityType: activity.type,
      file: null,
      tags: activity.tags?.join(", ") || "",
    });
  }, [activity, router]);

  // Track changes
  useEffect(() => {
    if (!activity) return;

    const hasFormChanges =
      formData.title !== activity.title ||
      formData.description !== activity.description ||
      formData.subject !== activity.subject ||
      formData.gradeLevel !== activity.gradeLevel ||
      formData.activityType !== activity.type ||
      formData.tags !== (activity.tags?.join(", ") || "") ||
      formData.file !== null;

    setHasChanges(hasFormChanges);
  }, [formData, activity]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório";
    } else if (formData.title.length < 5) {
      newErrors.title = "Título deve ter pelo menos 5 caracteres";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória";
    } else if (formData.description.length < 20) {
      newErrors.description = "Descrição deve ter pelo menos 20 caracteres";
    }

    if (!formData.subject) {
      newErrors.subject = "Selecione uma matéria";
    }

    if (!formData.gradeLevel) {
      newErrors.gradeLevel = "Selecione uma série/ano";
    }

    if (!formData.activityType) {
      newErrors.activityType = "Selecione o tipo de atividade";
    }

    if (formData.file) {
      const allowedTypes = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];
      const fileExtension =
        "." + formData.file.name.split(".").pop()?.toLowerCase();

      if (!allowedTypes.includes(fileExtension)) {
        newErrors.file = "Formato de arquivo não suportado";
      } else if (formData.file.size > 10 * 1024 * 1024) {
        newErrors.file = "Arquivo muito grande (máximo 10MB)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update mock data (in real app, this would be an API call)
      if (activity) {
        mockActivities[activityId] = {
          ...activity,
          title: formData.title,
          description: formData.description,
          subject: formData.subject,
          gradeLevel: formData.gradeLevel,
          type: formData.activityType,
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
          status: "Em Análise", // Status changes to pending after edit
        };
      }

      console.log("Activity updated:", formData);
      setShowSuccessMessage(true);
      setHasChanges(false);

      // Redirect after success
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));

    if (file && errors.file) {
      setErrors((prev) => ({ ...prev, file: undefined }));
    }
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmLeave = window.confirm(
        "Você tem alterações não salvas. Tem certeza que deseja sair sem salvar?"
      );
      if (!confirmLeave) return;
    }
    router.push("/profile");
  };

  if (!activity) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavigation />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Atividade não encontrada
            </h1>
            <Link href="/profile">
              <Button>Voltar ao Perfil</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavigation />
        <main className="container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Atividade Atualizada com Sucesso!
                </h2>
                <p className="text-gray-600 mb-6">
                  Suas alterações foram salvas. A atividade está sendo analisada
                  novamente.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => router.push("/profile")}>
                    Voltar ao Perfil
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSuccessMessage(false)}
                  >
                    Continuar Editando
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={handleCancel}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Editar Atividade
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  Modifique as informações da sua atividade
                </p>
              </div>
            </div>
            {hasChanges && (
              <Badge variant="secondary" className="hidden sm:flex">
                Alterações não salvas
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span>Informações da Atividade</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    <FormField>
                      <FormLabel htmlFor="title" required>
                        Título da Atividade
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="title"
                          placeholder="Ex: Exercícios de Multiplicação - Tabuada do 7"
                          value={formData.title}
                          onChange={(e) =>
                            handleInputChange("title", e.target.value)
                          }
                          className={cn(
                            "h-11 text-base",
                            errors.title && "border-red-300 focus:ring-red-500"
                          )}
                          aria-invalid={!!errors.title}
                        />
                      </FormControl>
                      {errors.title && (
                        <FormMessage type="error">{errors.title}</FormMessage>
                      )}
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="description" required>
                        Descrição
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          id="description"
                          placeholder="Descreva o objetivo e conteúdo da atividade..."
                          value={formData.description}
                          onChange={(e) =>
                            handleInputChange("description", e.target.value)
                          }
                          rows={4}
                          className={cn(
                            "text-base resize-none",
                            errors.description &&
                              "border-red-300 focus:ring-red-500"
                          )}
                          aria-invalid={!!errors.description}
                        />
                      </FormControl>
                      {errors.description && (
                        <FormMessage type="error">
                          {errors.description}
                        </FormMessage>
                      )}
                    </FormField>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField>
                        <FormLabel required>Matéria</FormLabel>
                        <FormControl>
                          <Select
                            value={formData.subject}
                            onValueChange={(value) =>
                              handleInputChange("subject", value)
                            }
                            options={subjectOptions}
                            placeholder="Selecione a matéria"
                            className={errors.subject ? "border-red-300" : ""}
                            required
                          />
                        </FormControl>
                        {errors.subject && (
                          <FormMessage type="error">
                            {errors.subject}
                          </FormMessage>
                        )}
                      </FormField>

                      <FormField>
                        <FormLabel required>Série/Ano</FormLabel>
                        <FormControl>
                          <Select
                            value={formData.gradeLevel}
                            onValueChange={(value) =>
                              handleInputChange("gradeLevel", value)
                            }
                            options={gradeLevelOptions}
                            placeholder="Selecione a série"
                            className={
                              errors.gradeLevel ? "border-red-300" : ""
                            }
                            required
                          />
                        </FormControl>
                        {errors.gradeLevel && (
                          <FormMessage type="error">
                            {errors.gradeLevel}
                          </FormMessage>
                        )}
                      </FormField>
                    </div>

                    <FormField>
                      <FormLabel required>Tipo de Atividade</FormLabel>
                      <FormControl>
                        <Select
                          value={formData.activityType}
                          onValueChange={(value) =>
                            handleInputChange("activityType", value)
                          }
                          options={activityTypeOptions}
                          placeholder="Selecione o tipo"
                          className={
                            errors.activityType ? "border-red-300" : ""
                          }
                          required
                        />
                      </FormControl>
                      {errors.activityType && (
                        <FormMessage type="error">
                          {errors.activityType}
                        </FormMessage>
                      )}
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="tags">
                        Tags (separadas por vírgula)
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="tags"
                          placeholder="Ex: multiplicação, tabuada, matemática básica"
                          value={formData.tags}
                          onChange={(e) =>
                            handleInputChange("tags", e.target.value)
                          }
                          className="h-11 text-base"
                        />
                      </FormControl>
                      <p className="text-xs text-gray-500">
                        Tags ajudam outros professores a encontrar sua atividade
                      </p>
                    </FormField>

                    <FormField>
                      <FormLabel htmlFor="file">
                        Substituir Arquivo (opcional)
                      </FormLabel>
                      <FormControl>
                        <div
                          className={cn(
                            "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors",
                            errors.file && "border-red-300"
                          )}
                        >
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-4" />
                          <div className="space-y-2">
                            <p className="text-sm text-gray-600">
                              Clique para selecionar um novo arquivo ou mantenha
                              o atual
                            </p>
                            <p className="text-xs text-gray-500">
                              Formatos aceitos: PDF, DOC, DOCX, PPT, PPTX (máx.
                              10MB)
                            </p>
                            <input
                              type="file"
                              id="file"
                              className="hidden"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx,.ppt,.pptx"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              className="h-10 bg-transparent"
                              onClick={() =>
                                document.getElementById("file")?.click()
                              }
                            >
                              Selecionar Novo Arquivo
                            </Button>
                          </div>
                        </div>
                      </FormControl>
                      {formData.file && (
                        <FormMessage type="success">
                          Novo arquivo selecionado: {formData.file.name}
                        </FormMessage>
                      )}
                      {errors.file && (
                        <FormMessage type="error">{errors.file}</FormMessage>
                      )}
                    </FormField>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button
                        type="submit"
                        className="flex-1 h-11"
                        disabled={isSubmitting || !hasChanges}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Salvando...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Salvar Alterações
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1 h-11 bg-transparent"
                        onClick={handleCancel}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Cancelar
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Current File Info */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Arquivo Atual</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Nome</span>
                    <span className="font-medium text-sm">
                      {activity.fileName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tamanho</span>
                    <span className="font-medium text-sm">
                      {activity.fileSize}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <Badge
                      variant={
                        activity.status === "Aprovada" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Stats */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Downloads</span>
                    <span className="font-medium text-sm">
                      {activity.downloads}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Avaliação</span>
                    <span className="font-medium text-sm">
                      {activity.rating}/5
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Enviado em</span>
                    <span className="font-medium text-sm">
                      {activity.uploadDate}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Help */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-blue-600">
                    Dicas de Edição
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>
                      • Após editar, sua atividade será analisada novamente
                    </li>
                    <li>• Use tags relevantes para facilitar a busca</li>
                    <li>• Mantenha a descrição clara e detalhada</li>
                    <li>• Só substitua o arquivo se necessário</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
