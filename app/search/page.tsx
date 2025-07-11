"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { FormField, FormLabel } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Filter, Star, User, SlidersHorizontal, X } from "lucide-react"
import Link from "next/link"
import { TopNavigation } from "@/components/top-navigation"

const mockActivities = [
  {
    id: 1,
    title: "Exercícios de Multiplicação - Tabuada do 7",
    description: "Atividade prática para fixação da tabuada do 7 com exercícios variados e jogos.",
    subject: "Matemática",
    gradeLevel: "3º Ano",
    type: "Exercício",
    author: "Prof. Maria Silva",
    rating: 4.8,
    downloads: 156,
  },
  {
    id: 2,
    title: "Interpretação de Texto - Fábulas",
    description: "Coletânea de fábulas com questões de interpretação e compreensão textual.",
    subject: "Português",
    gradeLevel: "4º Ano",
    type: "Exercício",
    author: "Prof. João Santos",
    rating: 4.9,
    downloads: 203,
  },
  {
    id: 3,
    title: "Sistema Solar - Plano de Aula Completo",
    description: "Plano de aula detalhado sobre o sistema solar com atividades práticas e experimentos.",
    subject: "Ciências",
    gradeLevel: "5º Ano",
    type: "Plano de Aula",
    author: "Prof. Ana Costa",
    rating: 4.7,
    downloads: 89,
  },
]

export default function SearchActivitiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("")
  const [gradeLevelFilter, setGradeLevelFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const subjectOptions = [
    { value: "", label: "Todas as matérias" },
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
    { value: "", label: "Todas as séries" },
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

  const typeOptions = [
    { value: "", label: "Todos os tipos" },
    { value: "Prova", label: "Prova" },
    { value: "Exercício", label: "Exercício" },
    { value: "Plano de Aula", label: "Plano de Aula" },
    { value: "Projeto", label: "Projeto" },
    { value: "Jogo Educativo", label: "Jogo Educativo" },
    { value: "Apresentação", label: "Apresentação" },
  ]

  const filteredActivities = mockActivities.filter((activity) => {
    return (
      activity.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!subjectFilter || activity.subject === subjectFilter) &&
      (!gradeLevelFilter || activity.gradeLevel === gradeLevelFilter) &&
      (!typeFilter || activity.type === typeFilter)
    )
  })

  const clearFilters = () => {
    setSubjectFilter("")
    setGradeLevelFilter("")
    setTypeFilter("")
    setSearchTerm("")
    setIsFilterOpen(false)
  }

  const FilterContent = () => (
    <div className="space-y-4">
      <FormField>
        <FormLabel>Matéria</FormLabel>
        <Select
          value={subjectFilter}
          onValueChange={setSubjectFilter}
          options={subjectOptions}
          placeholder="Todas as matérias"
        />
      </FormField>

      <FormField>
        <FormLabel>Série/Ano</FormLabel>
        <Select
          value={gradeLevelFilter}
          onValueChange={setGradeLevelFilter}
          options={gradeLevelOptions}
          placeholder="Todas as séries"
        />
      </FormField>

      <FormField>
        <FormLabel>Tipo de Atividade</FormLabel>
        <Select value={typeFilter} onValueChange={setTypeFilter} options={typeOptions} placeholder="Todos os tipos" />
      </FormField>

      <Button variant="outline" className="w-full h-10 bg-transparent" onClick={clearFilters}>
        <X className="h-4 w-4 mr-2" />
        Limpar Filtros
      </Button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Buscar Atividades</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Encontre atividades educacionais compartilhadas por outros professores
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:col-span-1">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Filter className="h-5 w-5" />
                  <span>Filtros</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterContent />
              </CardContent>
            </Card>
          </div>

          {/* Search Results */}
          <div className="lg:col-span-3">
            {/* Search Bar and Mobile Filter */}
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por título ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11 text-base"
                />
              </div>

              {/* Mobile Filter Button */}
              <div className="lg:hidden relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-11 w-11 bg-transparent"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>

                {/* Mobile Filter Dropdown */}
                {isFilterOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold flex items-center">
                          <Filter className="h-4 w-4 mr-2" />
                          Filtros
                        </h3>
                        <Button variant="ghost" size="sm" onClick={() => setIsFilterOpen(false)}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <FilterContent />
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">{filteredActivities.length} atividade(s) encontrada(s)</p>
            </div>

            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-base sm:text-lg mb-2 line-clamp-2">
                          <Link href={`/activity/${activity.id}`} className="hover:text-blue-600 transition-colors">
                            {activity.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="mb-3 text-sm line-clamp-2">{activity.description}</CardDescription>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="secondary" className="text-xs">
                            {activity.subject}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {activity.gradeLevel}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {activity.type}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="truncate max-w-32 sm:max-w-none">{activity.author}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                            <span>{activity.rating}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span>{activity.downloads} downloads</span>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full sm:w-auto sm:ml-4 h-10 bg-green-600 hover:bg-green-700">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma atividade encontrada</h3>
                  <p className="text-gray-600">Tente ajustar os filtros ou termos de busca</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
