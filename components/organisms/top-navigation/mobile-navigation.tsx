"use client"

import { useState } from "react"
import { Button } from "@/components/atoms/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { BookOpen, Upload, Search, User, Settings, LogOut, Menu } from "lucide-react"
import { useRouter } from "next/navigation"

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    setIsOpen(false)
    router.push("/")
  }

  const handleNavigation = (path: string) => {
    setIsOpen(false)
    router.push(path)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2 text-left">
            <div className="bg-blue-600 p-2 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">EducaFácil</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col space-y-4 mt-8">
          <Button variant="ghost" className="justify-start h-12 text-base" onClick={() => handleNavigation("/home")}>
            <BookOpen className="h-5 w-5 mr-3" />
            Início
          </Button>

          <Button variant="ghost" className="justify-start h-12 text-base" onClick={() => handleNavigation("/submit")}>
            <Upload className="h-5 w-5 mr-3" />
            Enviar Atividade
          </Button>

          <Button variant="ghost" className="justify-start h-12 text-base" onClick={() => handleNavigation("/search")}>
            <Search className="h-5 w-5 mr-3" />
            Buscar Atividades
          </Button>

          <div className="border-t pt-4 mt-4">
            <Button
              variant="ghost"
              className="justify-start h-12 text-base"
              onClick={() => handleNavigation("/profile")}
            >
              <User className="h-5 w-5 mr-3" />
              Meu Perfil
            </Button>

            <Button
              variant="ghost"
              className="justify-start h-12 text-base"
              onClick={() => handleNavigation("/settings")}
            >
              <Settings className="h-5 w-5 mr-3" />
              Configurações
            </Button>
          </div>

          <div className="border-t pt-4 mt-4">
            <Button
              variant="ghost"
              className="justify-start h-12 text-base text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sair
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
