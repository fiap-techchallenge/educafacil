"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { FormField, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { Upload, Save, X, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Activity {
  id: number
  title: string
  description: string
  subject: string
  gradeLevel: string
  type: string
  status: string
  tags?: string[]
}

interface EditActivityModalProps {
  activity: Activity
  isOpen: boolean
  onClose: () => void
  onSave: (updatedActivity: Activity) => void
}

interface FormData {
  title: string
  description: string
  subject: string
  gradeLevel: string
  activityType: string
  tags: string
  file: File | null
}

interface FormErrors {
  title?: string
  description?: string
  subject?: string
  gradeLevel?: string
  activityType?: string
}

export function EditActivityModal({ activity, isOpen, onClose, onSave }: EditActivityModalProps) {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    subject: "",
    gradeLevel: "",
    activityType: "",
    tags: "",
    file: null,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const subjectOptions = [
    { value: "Matemática", label: "Matemática" },
    { value: "Português", label: "Português" },
    { value: "Ciências", label: "Ciências" },
    { value: "História", label: "História" },
    { value: "Geografia", label: "Geografia" },
    { value: "Artes", label: "Artes" },
    { value: "Educação Física", label: "Educação Física" },
    { value: "Inglês", label: "Inglês" },
  ]

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
  ]

  const activityTypeOptions = [
    { value: "Prova", label: "Prova" },
    { value: "Exercício", label: "Exercício" },
    { value: "Plano de Aula", label: "Plano de Aula" },
    { value: "Projeto", label: "Projeto" },
    { value: "Jogo Educativo", label: "Jogo Educativo" },
    { value: "Apresentação", label: "Apresentação" },
  ]

  // Load activity data when modal opens
  useEffect(() => {
    if (isOpen && activity) {
      setFormData({
        title: activity.title,
        description: activity.description,
        subject: activity.subject,
        gradeLevel: activity.gradeLevel,
        activityType: activity.type,
        tags: activity.tags?.join(", ") || "",
        file: null,
      })
      setErrors({})
      setShowSuccess(false)
    }
  }, [isOpen, activity])

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "unset"
    }
  }, [isOpen, onClose])

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
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const updatedActivity: Activity = {
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
        status: "Em Análise", // Status changes after edit
      }

      onSave(updatedActivity)
      setShowSuccess(true)

      // Close modal after success
      setTimeout(() => {
        setShowSuccess(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error("Update error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, file }))
  }

  if (!isOpen) return null

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative z-50 w-full max-w-md mx-4 bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-2">Atividade Atualizada!</h2>
            <p className="text-gray-600">Suas alterações foram salvas com sucesso.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-50 w-full max-w-2xl mx-4 bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Editar Atividade</h2>
              <p className="text-sm text-gray-600">Modifique as informações da sua atividade</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <FormField>
              <FormLabel htmlFor="modal-title" required>
                Título da Atividade
              </FormLabel>
              <FormControl>
                <Input
                  id="modal-title"
                  placeholder="Ex: Exercícios de Multiplicação - Tabuada do 7"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className={cn("h-11 text-base", errors.title && "border-red-300 focus:ring-red-500")}
                  aria-invalid={!!errors.title}
                />
              </FormControl>
              {errors.title && <FormMessage type="error">{errors.title}</FormMessage>}
            </FormField>

            <FormField>
              <FormLabel htmlFor="modal-description" required>
                Descrição
              </FormLabel>
              <FormControl>
                <Textarea
                  id="modal-description"
                  placeholder="Descreva o objetivo e conteúdo da atividade..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  className={cn("text-base resize-none", errors.description && "border-red-300 focus:ring-red-500")}
                  aria-invalid={!!errors.description}
                />
              </FormControl>
              {errors.description && <FormMessage type="error">{errors.description}</FormMessage>}
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
              <FormLabel htmlFor="modal-tags">Tags (separadas por vírgula)</FormLabel>
              <FormControl>
                <Input
                  id="modal-tags"
                  placeholder="Ex: multiplicação, tabuada, matemática básica"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  className="h-11 text-base"
                />
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel htmlFor="modal-file">Substituir Arquivo (opcional)</FormLabel>
              <FormControl>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                  <Upload className="h-6 w-6 text-gray-400 mx-auto mb-2" />
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Clique para selecionar um novo arquivo</p>
                    <input
                      type="file"
                      id="modal-file"
                      className="hidden"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.ppt,.pptx"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                      onClick={() => document.getElementById("modal-file")?.click()}
                    >
                      Selecionar Arquivo
                    </Button>
                  </div>
                </div>
              </FormControl>
              {formData.file && <FormMessage type="success">Novo arquivo: {formData.file.name}</FormMessage>}
            </FormField>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
              <Button type="submit" className="flex-1 h-11" disabled={isSubmitting}>
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
              <Button type="button" variant="outline" className="flex-1 h-11 bg-transparent" onClick={onClose}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
