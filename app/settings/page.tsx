"use client"

import type React from "react"

import { useState } from "react"
import { CustomButton } from "@/components/custom/button"
import { CustomInput, CustomLabel } from "@/components/custom/input"
import {
  CustomCard,
  CustomCardContent,
  CustomCardDescription,
  CustomCardHeader,
  CustomCardTitle,
} from "@/components/custom/card"
import { CustomSwitch } from "@/components/custom/switch"
import { CustomSelect } from "@/components/custom/select"
import { CustomTabs, CustomTabsContent, CustomTabsList, CustomTabsTrigger } from "@/components/custom/tabs"
import { CustomAlert, CustomAlertDescription } from "@/components/custom/alert"
import { Lock, Bell, Shield, User, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { TopNavigation } from "@/components/top-navigation"

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false)

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [newActivityNotifications, setNewActivityNotifications] = useState(true)
  const [downloadNotifications, setDownloadNotifications] = useState(false)
  const [weeklyDigest, setWeeklyDigest] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(false)

  // Privacy settings
  const [profileVisibility, setProfileVisibility] = useState("public")
  const [showEmail, setShowEmail] = useState(false)
  const [showSchool, setShowSchool] = useState(true)

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault()

    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem!")
      return
    }

    if (newPassword.length < 8) {
      alert("A nova senha deve ter pelo menos 8 caracteres!")
      return
    }

    // Simulate password change
    console.log("Password changed successfully")
    setPasswordChangeSuccess(true)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")

    setTimeout(() => setPasswordChangeSuccess(false), 5000)
  }

  const handleNotificationSave = () => {
    console.log("Notification settings saved:", {
      emailNotifications,
      newActivityNotifications,
      downloadNotifications,
      weeklyDigest,
      marketingEmails,
    })
    alert("Configurações de notificação salvas com sucesso!")
  }

  const handlePrivacySave = () => {
    console.log("Privacy settings saved:", {
      profileVisibility,
      showEmail,
      showSchool,
    })
    alert("Configurações de privacidade salvas com sucesso!")
  }

  const visibilityOptions = [
    { value: "public", label: "Público - Visível para todos" },
    { value: "teachers", label: "Apenas Professores - Visível para outros professores" },
    { value: "private", label: "Privado - Apenas você pode ver" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavigation />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-6 sm:mb-8">
            <Link href="/profile" className="text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Configurações</h1>
              <p className="text-sm sm:text-base text-gray-600">Gerencie suas preferências de conta e privacidade</p>
            </div>
          </div>

          <CustomTabs defaultValue="account">
            <CustomTabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
              <CustomTabsTrigger
                value="account"
                className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-3"
              >
                <User className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Conta</span>
              </CustomTabsTrigger>
              <CustomTabsTrigger
                value="security"
                className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-3"
              >
                <Lock className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Segurança</span>
              </CustomTabsTrigger>
              <CustomTabsTrigger
                value="notifications"
                className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-3"
              >
                <Bell className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Notificações</span>
              </CustomTabsTrigger>
              <CustomTabsTrigger
                value="privacy"
                className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 p-3"
              >
                <Shield className="h-4 w-4" />
                <span className="text-xs sm:text-sm">Privacidade</span>
              </CustomTabsTrigger>
            </CustomTabsList>

            {/* Account Settings */}
            <CustomTabsContent value="account" className="space-y-6 mt-6">
              <CustomCard>
                <CustomCardHeader className="pb-4">
                  <CustomCardTitle className="flex items-center space-x-2 text-lg">
                    <User className="h-5 w-5" />
                    <span>Informações da Conta</span>
                  </CustomCardTitle>
                  <CustomCardDescription className="text-sm">
                    Atualize suas informações pessoais e de contato
                  </CustomCardDescription>
                </CustomCardHeader>
                <CustomCardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <CustomLabel htmlFor="firstName">Nome</CustomLabel>
                      <CustomInput id="firstName" defaultValue="Maria" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <CustomLabel htmlFor="lastName">Sobrenome</CustomLabel>
                      <CustomInput id="lastName" defaultValue="Silva" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <CustomLabel htmlFor="email">Email</CustomLabel>
                    <CustomInput id="email" type="email" defaultValue="maria.silva@escola.gov.br" className="h-11" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <CustomLabel htmlFor="school">Escola</CustomLabel>
                      <CustomInput id="school" defaultValue="EMEF João da Silva" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <CustomLabel htmlFor="city">Cidade</CustomLabel>
                      <CustomInput id="city" defaultValue="São Paulo - SP" className="h-11" />
                    </div>
                  </div>
                  <CustomButton className="w-full sm:w-auto h-11">Salvar Alterações</CustomButton>
                </CustomCardContent>
              </CustomCard>
            </CustomTabsContent>

            {/* Security Settings */}
            <CustomTabsContent value="security" className="space-y-6 mt-6">
              <CustomCard>
                <CustomCardHeader className="pb-4">
                  <CustomCardTitle className="flex items-center space-x-2 text-lg">
                    <Lock className="h-5 w-5" />
                    <span>Alterar Senha</span>
                  </CustomCardTitle>
                  <CustomCardDescription className="text-sm">
                    Mantenha sua conta segura com uma senha forte
                  </CustomCardDescription>
                </CustomCardHeader>
                <CustomCardContent>
                  {passwordChangeSuccess && (
                    <CustomAlert variant="success" className="mb-4">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <CustomAlertDescription className="text-green-800 ml-2">
                        Senha alterada com sucesso!
                      </CustomAlertDescription>
                    </CustomAlert>
                  )}

                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div className="space-y-2">
                      <CustomLabel htmlFor="currentPassword">Senha Atual</CustomLabel>
                      <div className="relative">
                        <CustomInput
                          id="currentPassword"
                          type={showCurrentPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          required
                          className="h-11 pr-10"
                        />
                        <CustomButton
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        >
                          {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </CustomButton>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <CustomLabel htmlFor="newPassword">Nova Senha</CustomLabel>
                      <div className="relative">
                        <CustomInput
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          required
                          minLength={8}
                          className="h-11 pr-10"
                        />
                        <CustomButton
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </CustomButton>
                      </div>
                      <p className="text-xs text-gray-500">A senha deve ter pelo menos 8 caracteres</p>
                    </div>

                    <div className="space-y-2">
                      <CustomLabel htmlFor="confirmPassword">Confirmar Nova Senha</CustomLabel>
                      <div className="relative">
                        <CustomInput
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                          className="h-11 pr-10"
                        />
                        <CustomButton
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </CustomButton>
                      </div>
                    </div>

                    <CustomButton type="submit" className="w-full sm:w-auto h-11">
                      Alterar Senha
                    </CustomButton>
                  </form>
                </CustomCardContent>
              </CustomCard>

              <CustomCard>
                <CustomCardHeader className="pb-4">
                  <CustomCardTitle className="text-lg">Segurança da Conta</CustomCardTitle>
                  <CustomCardDescription className="text-sm">
                    Configurações adicionais de segurança
                  </CustomCardDescription>
                </CustomCardHeader>
                <CustomCardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-0.5">
                      <CustomLabel className="text-sm font-medium">Autenticação de Dois Fatores</CustomLabel>
                      <p className="text-xs sm:text-sm text-gray-500">
                        Adicione uma camada extra de segurança à sua conta
                      </p>
                    </div>
                    <CustomButton variant="outline" className="w-full sm:w-auto h-10">
                      Configurar
                    </CustomButton>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-0.5">
                      <CustomLabel className="text-sm font-medium">Sessões Ativas</CustomLabel>
                      <p className="text-xs sm:text-sm text-gray-500">Gerencie dispositivos conectados à sua conta</p>
                    </div>
                    <CustomButton variant="outline" className="w-full sm:w-auto h-10">
                      Ver Sessões
                    </CustomButton>
                  </div>
                </CustomCardContent>
              </CustomCard>
            </CustomTabsContent>

            {/* Notification Settings */}
            <CustomTabsContent value="notifications" className="space-y-6 mt-6">
              <CustomCard>
                <CustomCardHeader className="pb-4">
                  <CustomCardTitle className="flex items-center space-x-2 text-lg">
                    <Bell className="h-5 w-5" />
                    <span>Preferências de Notificação</span>
                  </CustomCardTitle>
                  <CustomCardDescription className="text-sm">
                    Escolha como e quando você quer receber notificações
                  </CustomCardDescription>
                </CustomCardHeader>
                <CustomCardContent className="space-y-6">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Notificações por Email",
                        description: "Receber notificações gerais por email",
                        checked: emailNotifications,
                        onChange: setEmailNotifications,
                      },
                      {
                        title: "Novas Atividades",
                        description: "Notificar quando novas atividades forem publicadas na sua área",
                        checked: newActivityNotifications,
                        onChange: setNewActivityNotifications,
                      },
                      {
                        title: "Downloads das Minhas Atividades",
                        description: "Notificar quando suas atividades forem baixadas",
                        checked: downloadNotifications,
                        onChange: setDownloadNotifications,
                      },
                      {
                        title: "Resumo Semanal",
                        description: "Receber um resumo semanal das suas atividades e estatísticas",
                        checked: weeklyDigest,
                        onChange: setWeeklyDigest,
                      },
                      {
                        title: "Emails Promocionais",
                        description: "Receber informações sobre novos recursos e atualizações",
                        checked: marketingEmails,
                        onChange: setMarketingEmails,
                      },
                    ].map((setting, index) => (
                      <div key={index} className="flex items-start justify-between gap-4">
                        <div className="space-y-0.5 flex-1">
                          <CustomLabel className="text-sm font-medium">{setting.title}</CustomLabel>
                          <p className="text-xs sm:text-sm text-gray-500">{setting.description}</p>
                        </div>
                        <CustomSwitch checked={setting.checked} onChange={setting.onChange} />
                      </div>
                    ))}
                  </div>

                  <CustomButton onClick={handleNotificationSave} className="w-full sm:w-auto h-11">
                    Salvar Preferências
                  </CustomButton>
                </CustomCardContent>
              </CustomCard>
            </CustomTabsContent>

            {/* Privacy Settings */}
            <CustomTabsContent value="privacy" className="space-y-6 mt-6">
              <CustomCard>
                <CustomCardHeader className="pb-4">
                  <CustomCardTitle className="flex items-center space-x-2 text-lg">
                    <Shield className="h-5 w-5" />
                    <span>Configurações de Privacidade</span>
                  </CustomCardTitle>
                  <CustomCardDescription className="text-sm">
                    Controle quais informações são visíveis para outros usuários
                  </CustomCardDescription>
                </CustomCardHeader>
                <CustomCardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <CustomLabel className="text-sm font-medium">Visibilidade do Perfil</CustomLabel>
                      <CustomSelect
                        value={profileVisibility}
                        onValueChange={setProfileVisibility}
                        options={visibilityOptions}
                        className="h-11"
                      />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <CustomLabel className="text-sm font-medium">Mostrar Email no Perfil</CustomLabel>
                        <p className="text-xs sm:text-sm text-gray-500">Permitir que outros usuários vejam seu email</p>
                      </div>
                      <CustomSwitch checked={showEmail} onChange={setShowEmail} />
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-0.5 flex-1">
                        <CustomLabel className="text-sm font-medium">Mostrar Escola no Perfil</CustomLabel>
                        <p className="text-xs sm:text-sm text-gray-500">
                          Exibir informações da sua escola no perfil público
                        </p>
                      </div>
                      <CustomSwitch checked={showSchool} onChange={setShowSchool} />
                    </div>
                  </div>

                  <CustomAlert>
                    <AlertCircle className="h-4 w-4" />
                    <CustomAlertDescription className="text-sm ml-2">
                      Suas atividades sempre mostrarão seu nome como autor, independentemente das configurações de
                      privacidade.
                    </CustomAlertDescription>
                  </CustomAlert>

                  <CustomButton onClick={handlePrivacySave} className="w-full sm:w-auto h-11">
                    Salvar Configurações
                  </CustomButton>
                </CustomCardContent>
              </CustomCard>

              <CustomCard>
                <CustomCardHeader className="pb-4">
                  <CustomCardTitle className="text-red-600 text-lg">Zona de Perigo</CustomCardTitle>
                  <CustomCardDescription className="text-sm">
                    Ações irreversíveis relacionadas à sua conta
                  </CustomCardDescription>
                </CustomCardHeader>
                <CustomCardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-red-200 rounded-lg bg-red-50">
                    <div className="space-y-0.5">
                      <CustomLabel className="text-red-800 text-sm font-medium">Excluir Conta</CustomLabel>
                      <p className="text-xs sm:text-sm text-red-600">
                        Excluir permanentemente sua conta e todas as atividades
                      </p>
                    </div>
                    <CustomButton variant="destructive" className="w-full sm:w-auto h-10">
                      Excluir Conta
                    </CustomButton>
                  </div>
                </CustomCardContent>
              </CustomCard>
            </CustomTabsContent>
          </CustomTabs>
        </div>
      </main>
    </div>
  )
}
