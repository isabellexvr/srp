// components/AppSidebar.jsx
import { Link, usePage } from '@inertiajs/react';
import { 
  LayoutDashboard, 
  FileText, 
  LogOut,
  School,
  GraduationCap 
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Processos", url: "/processos", icon: FileText },
  { title: "Escolas", url: "/escolas", icon: School },
];

const AppSidebar = () => {
  const { url } = usePage();

  const isActive = (path) => url === path || url.startsWith(path + '/');

  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col">
      {/* Header da Sidebar */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-lg">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">SEDUC/AL</h1>
            <p className="text-sm text-gray-600">Prestação de Contas</p>
          </div>
        </div>
      </div>

      {/* Menu de Navegação */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Menu Principal
          </p>
          
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.url);
            
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active 
                    ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer da Sidebar */}
      <div className="p-4 border-t border-gray-200">
        <Link 
          href="/logout" 
          method="post"
          as="button"
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </Link>
      </div>
    </div>
  );
};

export default AppSidebar;