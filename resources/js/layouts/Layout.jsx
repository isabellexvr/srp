// Layouts/Layout.jsx
import { usePage } from '@inertiajs/react';
import AppSidebar from '@/components/AppSidebar';

const Layout = ({ children }) => {
  const { url } = usePage();
  
  // Se estiver na página de login, não mostra sidebar
  if (url === '/login') {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AppSidebar />
      
      {/* Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              Sistema de Prestação de Contas
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {usePage().props.auth?.user?.name || 'Usuário'}
            </span>
          </div>
        </header>

        {/* Conteúdo da Página */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;