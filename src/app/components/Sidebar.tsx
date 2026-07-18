import { Home, FileSpreadsheet, Settings, User, PieChart, X } from "lucide-react";
import { NavLink } from "react-router";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSettingsClick: () => void;
}

export function Sidebar({ isOpen, onClose, onSettingsClick }: SidebarProps) {
  return (
    <>
      {/* Overlay for mobile (hidden since we use bottom nav) */}
      
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around z-40 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <NavLink 
          to="/" 
          className={({isActive}) => `flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] font-medium">Inicio</span>
        </NavLink>
        <NavLink 
          to="/estadisticas"
          className={({isActive}) => `flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <PieChart className="h-5 w-5" />
          <span className="text-[10px] font-medium">Estadísticas</span>
        </NavLink>
        <NavLink 
          to="/usuario"
          className={({isActive}) => `flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-medium">Usuario</span>
        </NavLink>
        <button 
          onClick={onSettingsClick}
          className="flex-1 py-3 flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span className="text-[10px] font-medium">Ajustes</span>
        </button>
      </nav>

      {/* Desktop Right Sidebar */}
      <aside 
        className={`hidden md:flex fixed md:absolute inset-y-0 right-0 z-30 w-64 bg-white border-l border-gray-200 flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <span className="text-xl font-bold text-purple-600 flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6" />
            DataFlow
          </span>
          <button 
            onClick={onClose}
            className="md:hidden p-2 -mr-2 text-gray-500 hover:bg-gray-100 rounded-md"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <NavLink 
            to="/" 
            className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <Home className="h-5 w-5" />
            Inicio
          </NavLink>
          <NavLink 
            to="/estadisticas" 
            className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <PieChart className="h-5 w-5" />
            Estadísticas
          </NavLink>
          <NavLink 
            to="/usuario" 
            className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-purple-50 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            <User className="h-5 w-5" />
            Usuario
          </NavLink>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={onSettingsClick}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Settings className="h-5 w-5" />
            Configuración
          </button>
        </div>
      </aside>
    </>
  );
}
