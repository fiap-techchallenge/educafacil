"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms/card"
import { ActivityCard } from "@/components/molecules/activity-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText } from "lucide-react"

interface Activity {
  id: number
  title: string
  subject: string
  gradeLevel: string
  type: string
  uploadDate: string
  downloads: number
  rating: number
  status: string
}

interface ActivitiesSectionProps {
  activities: Activity[]
  onEditActivity?: (id: number) => void
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = ({ activities, onEditActivity }) => {
  const approvedActivities = activities.filter((a) => a.status === "Aprovada")
  const pendingActivities = activities.filter((a) => a.status === "Em Análise")

  return (
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
              Todas ({activities.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="text-xs sm:text-sm">
              Aprovadas ({approvedActivities.length})
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-xs sm:text-sm">
              Em Análise ({pendingActivities.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-6">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                {...activity}
                onEdit={onEditActivity ? () => onEditActivity(activity.id) : undefined}
              />
            ))}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4 mt-6">
            {approvedActivities.map((activity) => (
              <ActivityCard key={activity.id} {...activity} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4 mt-6">
            {pendingActivities.map((activity) => (
              <ActivityCard key={activity.id} {...activity} />
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
