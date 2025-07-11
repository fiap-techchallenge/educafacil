"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BookOpen, Upload, Search, User, LogOut, Settings, Menu, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function TopNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    setIsProfileMenuOpen(false)
    router.push("/")
  }

  const handleMobileNavigation = (path: string) => {
    setIsMobileMenuOpen(false)
    router.push(path)
  }

  const handleProfileNavigation = (path: string) => {
    setIsProfileMenuOpen(false)
    router.push(path)
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Mobile Layout */}
          <div className="flex items-center justify-between w-full md:hidden">
            {/* Left: Hamburger Menu */}
            <div className="relative">
              <Button variant="ghost" size="sm" className="p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open navigation menu</span>
              </Button>

              {/* Mobile Menu Overlay */}
              {isMobileMenuOpen && (
                <>
                  <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)} />
                  <div className="fixed left-0 top-0 h-full w-80 bg-white shadow-lg z-50 p-6">
                    <div className="flex items-center space-x-2 mb-8">
                      <div className="bg-blue-600 p-2 rounded-lg">
                        <BookOpen className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-lg font-bold text-gray-900">EducaFácil</span>
                    </div>

                    <nav className="flex flex-col space-y-4">
                      <Button
                        variant="ghost"
                        className="justify-start h-12 text-base w-full"
                        onClick={() => handleMobileNavigation("/home")}
                      >
                        <BookOpen className="h-5 w-5 mr-3" />
                        Início
                      </Button>

                      <Button
                        variant="ghost"
                        className="justify-start h-12 text-base w-full"
                        onClick={() => handleMobileNavigation("/submit")}
                      >
                        <Upload className="h-5 w-5 mr-3" />
                        Enviar Atividade
                      </Button>

                      <Button
                        variant="ghost"
                        className="justify-start h-12 text-base w-full"
                        onClick={() => handleMobileNavigation("/search")}
                      >
                        <Search className="h-5 w-5 mr-3" />
                        Buscar Atividades
                      </Button>

                      <div className="border-t pt-4 mt-4">
                        <Button
                          variant="ghost"
                          className="justify-start h-12 text-base w-full"
                          onClick={() => handleMobileNavigation("/profile")}
                        >
                          <User className="h-5 w-5 mr-3" />
                          Meu Perfil
                        </Button>

                        <Button
                          variant="ghost"
                          className="justify-start h-12 text-base w-full"
                          onClick={() => handleMobileNavigation("/settings")}
                        >
                          <Settings className="h-5 w-5 mr-3" />
                          Configurações
                        </Button>
                      </div>

                      <div className="border-t pt-4 mt-4">
                        <Button
                          variant="ghost"
                          className="justify-start h-12 text-base text-red-600 hover:text-red-700 hover:bg-red-50 w-full"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-5 w-5 mr-3" />
                          Sair
                        </Button>
                      </div>
                    </nav>
                  </div>
                </>
              )}
            </div>

            {/* Center: Logo */}
            <Link href="/home" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">EducaFácil</span>
            </Link>

            {/* Right: Profile Dropdown */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="p-2"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <User className="h-5 w-5" />
                <span className="sr-only">Open profile menu</span>
              </Button>

              {/* Profile Dropdown */}
              {isProfileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsProfileMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-40">
                    <div className="py-1">
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleProfileNavigation("/profile")}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Meu Perfil
                      </button>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleProfileNavigation("/settings")}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configurações
                      </button>
                      <div className="border-t border-gray-100"></div>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex items-center justify-between w-full">
            {/* Desktop Logo */}
            <Link href="/home" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">EducaFácil</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-6">
              <Link
                href="/submit"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Upload className="h-4 w-4" />
                <span>Enviar Atividade</span>
              </Link>
              <Link
                href="/search"
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Search className="h-4 w-4" />
                <span>Buscar Atividades</span>
              </Link>
            </nav>

            {/* Desktop Profile Menu */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center space-x-2"
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              >
                <User className="h-4 w-4" />
                <span>Perfil</span>
                <ChevronDown className="h-3 w-3" />
              </Button>

              {/* Desktop Profile Dropdown */}
              {isProfileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-30" onClick={() => setIsProfileMenuOpen(false)} />
                  <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-40">
                    <div className="py-1">
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleProfileNavigation("/profile")}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Meu Perfil
                      </button>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleProfileNavigation("/settings")}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Configurações
                      </button>
                      <div className="border-t border-gray-100"></div>
                      <button
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sair
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
