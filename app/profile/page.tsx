"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, FileText, Download, Star, Camera, Edit3, Calendar, Settings, Eye } from "lucide-react"
import Link from "next/link"
import { TopNavigation } from "@/components/top-navigation"

const mockUserData = {
  name: "Prof. Maria Silva",
  email: "maria.silva@escola.gov.br",
  school: "EMEF João da Silva",
  city: "São Paulo - SP",
  joinDate: "Janeiro 2023",
  totalActivities: 12,
  totalDownloads: 1248,
  averageRating: 4.8,
  profileImage: "/placeholder.svg?height=100&width=100",
}

const mockUserActivities = [
  {
    id: 1,
    title: "Exercícios de Multiplicação - Tabuada do 7",
    subject: "Matemática",
    gradeLevel: "3º Ano",
    type: "Exercício",
    uploadDate: "15 Mar 2024",
    downloads: 156,
    rating: 4.8,
    status: "Aprovada",
  },
  {
    id: 2,
    title: "Plano de Aula - Frações",
    subject: "Matemática",
    gradeLevel: "4º Ano",
    type: "Plano de Aula",
    uploadDate: "10 Mar 2024",
    downloads: 89,
    rating: 4.9,
    status: "Aprovada",
  },
  {
    id: 3,
    title: "Atividade de Interpretação de Texto",
    subject: "Português",
    gradeLevel: "3º Ano",
    type: "Exercício",
    uploadDate: "05 Mar 2024",
    downloads: 203,
    rating: 4.7,
    status: "Aprovada",
  },
  {
    id: 4,
    title: "Experimentos de Ciências - Plantas",
    subject: "Ciências",
    gradeLevel: "2º Ano",
    type: "Projeto",
    uploadDate: "28 Fev 2024",
    downloads: 124,
    rating: 4.6,
    status: "Em Análise",
  },
]

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [editedName, setEditedName] = useState(mockUserData.name)
  const [editedEmail, setEditedEmail] = useState(mockUserData.email)

  const handleSaveProfile = () => {
    setIsEditing(false)
    console.log("Profile saved:", { name: editedName, email: editedEmail })
  }

  const handleEditActivity = (id: number) => {
    router.push(`/edit-activity/${id}`)
  }

  const handleViewActivity = (id: number) => {
    router.push(`/activity/${id}`)
  }

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Aprovada":
        return "default"
      case "Em Análise":
        return "secondary"
      case "Rejeitada":
        return "destructive"
      default:
        return "outline"
    }
  }

  const approvedActivities = mockUserActivities.filter((a) => a.status === "Aprovada")
  const pendingActivities = mockUserActivities.filter((a) => a.status === "Em Análise")

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
              <p className="text-sm sm:text-base text-gray-600">Gerencie suas informações pessoais e atividades</p>
            </div>
            <Link href="/settings">
              <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                <Settings className="h-4 w-4" />
                <span>Configurações</span>
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <User className="h-5 w-5" />
                    <span>Informações Pessoais</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="relative">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-12 w-12 text-gray-400" />
                        </div>
                        <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="text-center space-y-2 w-full">
                        <h3 className="text-lg font-semibold">{mockUserData.name}</h3>
                        <p className="text-gray-600 text-sm break-all">{mockUserData.email}</p>
                        {!isEditing && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            className="flex items-center space-x-2 h-9"
                          >
                            <Edit3 className="h-4 w-4" />
                            <span>Editar</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedEmail}
                          onChange={(e) => setEditedEmail(e.target.value)}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button size="sm" onClick={handleSaveProfile} className="flex-1 h-9">
                          Salvar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setIsEditing(false)} className="flex-1 h-9">
                          Cancelar
                        </Button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 pt-4 border-t">
                    {[
                      { label: "Escola", value: mockUserData.school },
                      { label: "Cidade", value: mockUserData.city },
                      { label: "Membro desde", value: mockUserData.joinDate },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-start">
                        <span className="text-sm text-gray-600">{item.label}</span>
                        <span className="text-sm font-medium text-right max-w-32 sm:max-w-none">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg">Estatísticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm text-gray-600">Atividades enviadas</span>
                    </div>
                    <span className="font-semibold text-lg">{mockUserData.totalActivities}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Download className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">Total de downloads</span>
                    </div>
                    <span className="font-semibold text-lg">{mockUserData.totalDownloads}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-gray-600">Avaliação média</span>
                    </div>
                    <span className="font-semibold text-lg">{mockUserData.averageRating}/5</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Activities Section */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <FileText className="h-5 w-5" />
                    <span>Minhas Atividades</span>
                  </CardTitle>
                  <CardDescription className="text-sm">Gerencie e acompanhe suas atividades enviadas</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="grid w-full grid-cols-3 h-10">
                      <TabsTrigger value="all" className="text-xs sm:text-sm">
                        Todas ({mockUserActivities.length})
                      </TabsTrigger>
                      <TabsTrigger value="approved" className="text-xs sm:text-sm">
                        Aprovadas ({approvedActivities.length})
                      </TabsTrigger>
                      <TabsTrigger value="pending" className="text-xs sm:text-sm">
                        Em Análise ({pendingActivities.length})
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="all" className="space-y-4 mt-6">
                      {mockUserActivities.map((activity) => (
                        <Card key={activity.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2">
                                    {activity.title}
                                  </h4>
                                  <Badge variant={getStatusVariant(activity.status)} className="text-xs w-fit">
                                    {activity.status}
                                  </Badge>
                                </div>
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
                                    <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span>{activity.uploadDate}</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                                    <span>{activity.downloads} downloads</span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <Star className="h-3 w-3 sm:h-4 sm:w-4 fill-yellow-400 text-yellow-400" />
                                    <span>{activity.rating}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-row sm:flex-col gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditActivity(activity.id)}
                                  className="flex-1 sm:flex-none h-9 text-xs bg-transparent"
                                >
                                  <Edit3 className="h-3 w-3 mr-1" />
                                  Editar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewActivity(activity.id)}
                                  className="flex-1 sm:flex-none h-9 text-xs bg-transparent"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Ver
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="approved" className="space-y-4 mt-6">
                      {approvedActivities.map((activity) => (
                        <Card key={activity.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 text-sm sm:text-base mb-2">
                                  {activity.title}
                                </h4>
                                <div className="flex flex-wrap gap-2 mb-3">
                                  <Badge variant="secondary" className="text-xs">
                                    {activity.subject}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {activity.gradeLevel}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {activity.downloads} downloads • {activity.rating} ⭐
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditActivity(activity.id)}
                                  className="h-9 text-xs bg-transparent"
                                >
                                  <Edit3 className="h-3 w-3 mr-1" />
                                  Editar
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewActivity(activity.id)}
                                  className="h-9 text-xs bg-transparent"
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Ver
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>

                    <TabsContent value="pending" className="space-y-4 mt-6">
                      {pendingActivities.map((activity) => (
                        <Card key={activity.id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{activity.title}</h4>
                                  <Badge variant="secondary" className="text-xs">
                                    Em Análise
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {activity.subject}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {activity.gradeLevel}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">Enviado em {activity.uploadDate}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleEditActivity(activity.id)}
                                  className="h-9 text-xs bg-transparent"
                                >
                                  <Edit3 className="h-3 w-3 mr-1" />
                                  Editar
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
