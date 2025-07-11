"use client"

import { cn } from "@/lib/utils"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { FormField, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, FileText, CheckCircle } from "lucide-react"
import { TopNavigation } from "@/components/top-navigation"

interface FormData {
  title: string
  description: string
  subject: string
  gradeLevel: string
  activityType: string
  file: File | null
}

interface FormErrors {
  title?: string
  description?: string
  subject?: string
  gradeLevel?: string
  activityType?: string
  file?: string
}

export default function SubmitActivityPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    subject: "",
    gradeLevel: "",
    activityType: "",
    file: null,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const subjectOptions = [
    { value: "matematica", label: "Matemática" },
    { value: "portugues", label: "Português" },
    { value: "ciencias", label: "Ciências" },
    { value: "historia", label: "História" },
    { value: "geografia", label: "Geografia" },
    { value: "artes", label: "Artes" },
    { value: "educacao-fisica", label: "Educação Física" },
    { value: "ingles", label: "Inglês" },
  ]

  const gradeLevelOptions = [
    { value: "1ano", label: "1º Ano" },
    { value: "2ano", label: "2º Ano" },
    { value: "3ano", label: "3º Ano" },
    { value: "4ano", label: "4º Ano" },
    { value: "5ano", label: "5º Ano" },
    { value: "6ano", label: "6º Ano" },
    { value: "7ano", label: "7º Ano" },
    { value: "8ano", label: "8º Ano" },
    { value: "9ano", label: "9º Ano" },
  ]

  const activityTypeOptions = [
    { value: "prova", label: "Prova" },
    { value: "exercicio", label: "Exercício" },
    { value: "plano-aula", label: "Plano de Aula" },
    { value: "projeto", label: "Projeto" },
    { value: "jogo", label: "Jogo Educativo" },
    { value: "apresentacao", label: "Apresentação" },
  ]

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório"
    } else if (formData.title.length < 5) {
      newErrors.title = "Título deve ter pelo menos 5 caracteres"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória"
    } else if (formData.description.length < 20) {
      newErrors.description = "Descrição deve ter pelo menos 20 caracteres"
    }

    if (!formData.subject) {
      newErrors.subject = "Selecione uma matéria"
    }

    if (!formData.gradeLevel) {
      newErrors.gradeLevel = "Selecione uma série/ano"
    }

    if (!formData.activityType) {
      newErrors.activityType = "Selecione o tipo de atividade"
    }

    if (!formData.file) {
      newErrors.file = "Selecione um arquivo"
    } else {
      const allowedTypes = [".pdf", ".doc", ".docx", ".ppt", ".pptx"]
      const fileExtension = "." + formData.file.name.split(".").pop()?.toLowerCase()

      if (!allowedTypes.includes(fileExtension)) {
        newErrors.file = "Formato de arquivo não suportado"
      } else if (formData.file.size > 10 * 1024 * 1024) {
        // 10MB
        newErrors.file = "Arquivo muito grande (máximo 10MB)"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Form submitted:", formData)
      setSubmitSuccess(true)

      // Reset form
      setFormData({
        title: "",
        description: "",
        subject: "",
        gradeLevel: "",
        activityType: "",
        file: null,
      })

      // Reset file input
      const fileInput = document.getElementById("file") as HTMLInputElement
      if (fileInput) fileInput.value = ""
    } catch (error) {
      console.error("Submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, file }))

    // Clear file error when new file is selected
    if (file && errors.file) {
      setErrors((prev) => ({ ...prev, file: undefined }))
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TopNavigation />
        <main className="container mx-auto px-4 py-6 sm:py-8">
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Atividade Enviada com Sucesso!</h2>
                <p className="text-gray-600 mb-6">
                  Sua atividade foi enviada e está sendo analisada. Você receberá uma notificação quando for aprovada.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={() => setSubmitSuccess(false)}>Enviar Nova Atividade</Button>
                  <Button variant="outline" onClick={() => (window.location.href = "/profile")}>
                    Ver Minhas Atividades
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Enviar Nova Atividade</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Compartilhe sua atividade com outros professores da rede
            </p>
          </div>

          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
                <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                <span>Informações da Atividade</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <FormField>
                  <FormLabel htmlFor="title" required>
                    Título da Atividade
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="title"
                      placeholder="Ex: Exercícios de Multiplicação - Tabuada do 7"
                      value={formData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className={cn("h-11 text-base", errors.title && "border-red-300 focus:ring-red-500")}
                      aria-invalid={!!errors.title}
                      aria-describedby={errors.title ? "title-error" : undefined}
                    />
                  </FormControl>
                  {errors.title && (
                    <FormMessage id="title-error" type="error">
                      {errors.title}
                    </FormMessage>
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
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                      className={cn("text-base resize-none", errors.description && "border-red-300 focus:ring-red-500")}
                      aria-invalid={!!errors.description}
                      aria-describedby={errors.description ? "description-error" : undefined}
                    />
                  </FormControl>
                  {errors.description && (
                    <FormMessage id="description-error" type="error">
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
                        onValueChange={(value) => handleInputChange("subject", value)}
                        options={subjectOptions}
                        placeholder="Selecione a matéria"
                        className={errors.subject ? "border-red-300" : ""}
                        required
                      />
                    </FormControl>
                    {errors.subject && <FormMessage type="error">{errors.subject}</FormMessage>}
                  </FormField>

                  <FormField>
                    <FormLabel required>Série/Ano</FormLabel>
                    <FormControl>
                      <Select
                        value={formData.gradeLevel}
                        onValueChange={(value) => handleInputChange("gradeLevel", value)}
                        options={gradeLevelOptions}
                        placeholder="Selecione a série"
                        className={errors.gradeLevel ? "border-red-300" : ""}
                        required
                      />
                    </FormControl>
                    {errors.gradeLevel && <FormMessage type="error">{errors.gradeLevel}</FormMessage>}
                  </FormField>
                </div>

                <FormField>
                  <FormLabel required>Tipo de Atividade</FormLabel>
                  <FormControl>
                    <Select
                      value={formData.activityType}
                      onValueChange={(value) => handleInputChange("activityType", value)}
                      options={activityTypeOptions}
                      placeholder="Selecione o tipo"
                      className={errors.activityType ? "border-red-300" : ""}
                      required
                    />
                  </FormControl>
                  {errors.activityType && <FormMessage type="error">{errors.activityType}</FormMessage>}
                </FormField>

                <FormField>
                  <FormLabel htmlFor="file" required>
                    Arquivo da Atividade
                  </FormLabel>
                  <FormControl>
                    <div
                      className={cn(
                        "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors",
                        errors.file && "border-red-300",
                      )}
                    >
                      <Upload className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400 mx-auto mb-4" />
                      <div className="space-y-2">
                        <p className="text-sm text-gray-600">Clique para selecionar ou arraste o arquivo aqui</p>
                        <p className="text-xs text-gray-500">Formatos aceitos: PDF, DOC, DOCX, PPT, PPTX (máx. 10MB)</p>
                        <input
                          type="file"
                          id="file"
                          className="hidden"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          aria-invalid={!!errors.file}
                          aria-describedby={errors.file ? "file-error" : undefined}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          className="h-10 bg-transparent"
                          onClick={() => document.getElementById("file")?.click()}
                        >
                          Selecionar Arquivo
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  {formData.file && <FormMessage type="success">Arquivo selecionado: {formData.file.name}</FormMessage>}
                  {errors.file && (
                    <FormMessage id="file-error" type="error">
                      {errors.file}
                    </FormMessage>
                  )}
                </FormField>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button type="submit" className="flex-1 h-11" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Enviando...
                      </>
                    ) : (
                      "Enviar Atividade"
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 h-11 bg-transparent"
                    onClick={() => window.history.back()}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
