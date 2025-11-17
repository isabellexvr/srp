// resources/js/Layouts/Layout.jsx
import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Button } from "@/components/ui/button"
import { 
  LayoutDashboard, 
  FileText, 
  School, 
  LogOut,
  Menu,
  X 
} from 'lucide-react'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { auth } = usePage().props

  // Se não estiver autenticado, mostra apenas o conteúdo
  if (!auth?.user) {
    return children
  }

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Processos', href: '/processos', icon: FileText },
    { name: 'Escolas', href: '/escolas', icon: School },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-75"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <h1 className="text-lg font-semibold">SEDUC/AL</h1>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <nav className="flex-1 space-y-2 p-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Layout principal */}
      <div className="flex">
        {/* Sidebar desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-1 min-h-0 border-r bg-white">
            <div className="flex items-center gap-3 p-6 border-b">
              <School className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-lg font-semibold">SEDUC/AL</h1>
                <p className="text-sm text-muted-foreground">Prestação de Contas</p>
              </div>
            </div>
            <nav className="flex-1 space-y-2 p-4">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  >
                    <Icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
            <div className="p-4 border-t">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {auth.user?.name}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {auth.user?.email}
                  </p>
                </div>
              </div>
              <Link href="/logout" method="post" as="button">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6">
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex flex-1 items-center justify-between">
              <h1 className="text-2xl font-semibold">Sistema de Prestação de Contas</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                  {auth.user?.school?.name || 'Administrador'}
                </span>
              </div>
            </div>
          </header>

          {/* Conteúdo da página */}
          <main className="flex-1 overflow-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}