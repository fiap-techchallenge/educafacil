"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Download, Star, User, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TopNavigation } from "@/components/top-navigation"

// Mock data - in real app, this would come from API based on ID
const mockActivity = {
  id: 1,
  title: "Exercícios de Multiplicação - Tabuada do 7",
  description:
    "Esta atividade foi desenvolvida para auxiliar os alunos do 3º ano na fixação da tabuada do 7. Contém exercícios variados, desde cálculos simples até problemas contextualizados que ajudam na compreensão prática da multiplicação. A atividade inclui também jogos educativos e desafios que tornam o aprendizado mais divertido e eficaz.",
  subject: "Matemática",
  gradeLevel: "3º Ano",
  type: "Exercício",
  author: "Prof. Maria Silva",
  authorSchool: "EMEF João da Silva",
  authorCity: "São Paulo - SP",
  rating: 4.8,
  downloads: 156,
  views: 1240,
  uploadDate: "15 de março de 2024",
  fileSize: "2.3 MB",
  fileFormat: "PDF",
  tags: ["multiplicação", "tabuada", "matemática básica", "3º ano"],
  objectives: [
    "Fixar a tabuada do 7",
    "Desenvolver o raciocínio lógico-matemático",
    "Aplicar multiplicação em situações do cotidiano",
    "Estimular o interesse pela matemática",
  ],
  contents: [
    "Exercícios de multiplicação simples",
    "Problemas contextualizados",
    "Jogos educativos",
    "Desafios matemáticos",
    "Gabarito comentado",
  ],
}

export default function ActivityViewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/search" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar à busca
            </Link>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 line-clamp-3">{mockActivity.title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge className="bg-blue-100 text-blue-800 text-xs sm:text-sm">{mockActivity.subject}</Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    {mockActivity.gradeLevel}
                  </Badge>
                  <Badge variant="outline" className="text-xs sm:text-sm">
                    {mockActivity.type}
                  </Badge>
                </div>
              </div>
              <Button size="lg" className="w-full lg:w-auto bg-green-600 hover:bg-green-700 h-11 lg:h-12">
                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Descrição</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{mockActivity.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Objetivos de Aprendizagem</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockActivity.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="text-gray-700 text-sm sm:text-base">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Conteúdo da Atividade</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockActivity.contents.map((content, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mr-2 mt-1">✓</span>
                        <span className="text-gray-700 text-sm sm:text-base">{content}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockActivity.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <User className="h-5 w-5" />
                    <span>Autor</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{mockActivity.author}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{mockActivity.authorSchool}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{mockActivity.authorCity}</p>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{mockActivity.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">Avaliação</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { label: "Downloads", value: mockActivity.downloads },
                    { label: "Visualizações", value: mockActivity.views },
                    { label: "Data de envio", value: mockActivity.uploadDate },
                  ].map((stat, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">{stat.label}</span>
                      <span className="font-semibold text-xs sm:text-sm">{stat.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Informações do Arquivo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Formato</span>
                    <span className="font-semibold text-xs sm:text-sm">{mockActivity.fileFormat}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Tamanho</span>
                    <span className="font-semibold text-xs sm:text-sm">{mockActivity.fileSize}</span>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full bg-green-600 hover:bg-green-700 h-11" size="lg">
                <Download className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Baixar Atividade
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
