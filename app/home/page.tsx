"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Search, User, FileText, Download, Users } from "lucide-react"
import Link from "next/link"
import { TopNavigation } from "@/components/top-navigation"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Bem-vindo ao EducaFácil</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Compartilhe e encontre atividades educacionais de qualidade
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Upload className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                <CardTitle className="text-base sm:text-lg">Enviar Atividade</CardTitle>
              </div>
              <CardDescription className="text-sm">Compartilhe suas atividades com outros professores</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/submit">
                <Button className="w-full h-10 sm:h-11 text-sm sm:text-base">Enviar Nova Atividade</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <Search className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                <CardTitle className="text-base sm:text-lg">Buscar Atividades</CardTitle>
              </div>
              <CardDescription className="text-sm">Encontre atividades por matéria, série e tipo</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/search">
                <Button className="w-full h-10 sm:h-11 text-sm sm:text-base bg-green-600 hover:bg-green-700">
                  Explorar Atividades
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow sm:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                <CardTitle className="text-base sm:text-lg">Meu Perfil</CardTitle>
              </div>
              <CardDescription className="text-sm">Gerencie suas informações e atividades</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Link href="/profile">
                <Button className="w-full h-10 sm:h-11 text-sm sm:text-base bg-purple-600 hover:bg-purple-700">
                  Ver Perfil
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Statistics and Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                <span>Atividades Recentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {["Matemática - 5º ano", "Português - 3º ano", "Ciências - 4º ano"].map((activity, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-700">{activity}</span>
                    <Download className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                <span>Estatísticas</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {[
                  { label: "Atividades enviadas", value: "12" },
                  { label: "Downloads recebidos", value: "248" },
                  { label: "Avaliação média", value: "4.8/5" },
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">{stat.label}</span>
                    <span className="text-sm sm:text-base font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-base sm:text-lg text-green-600">Dicas</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                💡 Use palavras-chave específicas ao enviar atividades para facilitar a busca por outros professores.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
