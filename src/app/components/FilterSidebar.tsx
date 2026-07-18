import { X, Check, Filter, Calendar, TrendingUp, BarChart2 } from "lucide-react";
import { useState, useEffect } from "react";

interface FilterSidebarProps {
  activeFilters: string[];
  onAddFilter: (filter: string) => void;
  onRemoveFilter: (filter: string) => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
}

const FILTER_CATEGORIES = [
  {
    id: "status",
    title: "Estado",
    icon: BarChart2,
    options: ["Completado", "En progreso", "Pendiente"]
  },
  {
    id: "trend",
    title: "Tendencia",
    icon: TrendingUp,
    options: ["Positiva", "Negativa"]
  },
  {
    id: "date",
    title: "Fecha",
    icon: Calendar,
    options: ["Hoy", "Esta semana", "Este mes", "Este año"]
  }
];

export function FilterSidebar({ activeFilters, onAddFilter, onRemoveFilter, isMobileOpen, onMobileClose }: FilterSidebarProps) {
  // Estado local para lote móvil
  const [localFilters, setLocalFilters] = useState<Set<string>>(new Set(activeFilters));

  useEffect(() => {
    setLocalFilters(new Set(activeFilters));
  }, [activeFilters, isMobileOpen]);

  const toggleFilter = (filterText: string, isMobile: boolean) => {
    if (isMobile) {
      const next = new Set(localFilters);
      if (next.has(filterText)) next.delete(filterText);
      else next.add(filterText);
      setLocalFilters(next);
    } else {
      if (activeFilters.includes(filterText)) {
        onRemoveFilter(filterText);
      } else {
        onAddFilter(filterText);
      }
    }
  };

  const applyMobileFilters = () => {
    // Remover los que ya no están
    activeFilters.forEach(f => {
      if (!localFilters.has(f)) onRemoveFilter(f);
    });
    // Añadir los nuevos
    Array.from(localFilters).forEach(f => {
      if (!activeFilters.includes(f)) onAddFilter(f);
    });
    onMobileClose();
  };

  const SidebarContent = ({ isMobile }: { isMobile: boolean }) => (
    <div className="space-y-6">
      {FILTER_CATEGORIES.map(category => (
        <div key={category.id} className="space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <category.icon className="h-4 w-4 text-purple-500" />
            {category.title}
          </h3>
          <div className="space-y-2">
            {category.options.map(option => {
              const filterText = `${category.title}: ${option}`;
              const isActive = isMobile ? localFilters.has(filterText) : activeFilters.includes(filterText);
              
              return (
                <label 
                  key={option} 
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors border ${
                    isActive ? 'bg-purple-50 border-purple-200' : 'hover:bg-gray-50 border-transparent'
                  }`}
                >
                  <span className={`text-sm ${isActive ? 'text-purple-700 font-medium' : 'text-gray-600'}`}>
                    {option}
                  </span>
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    isActive ? 'bg-purple-600 border-purple-600 text-white' : 'border-gray-300'
                  }`}>
                    {isActive && <Check className="h-3 w-3" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={isActive}
                    onChange={() => toggleFilter(filterText, isMobile)}
                  />
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Push content, no overlap) */}
      <div 
        className={`hidden md:flex flex-col bg-white border-purple-100 transition-all duration-300 ease-in-out shrink-0 overflow-hidden ${
          isMobileOpen ? 'w-64 border-r' : 'w-0 border-r-0'
        }`}
      >
        <div className="w-64 h-full flex flex-col">
          <div className="h-16 px-6 border-b border-purple-100/50 flex items-center justify-between shrink-0 bg-white sticky top-0">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider flex items-center gap-2">
              <Filter className="h-4 w-4 text-purple-600" />
              Filtros
            </h2>
            <button 
              onClick={onMobileClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <SidebarContent isMobile={false} />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity ${isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onMobileClose} />
      
      <div className={`fixed z-50 bg-white flex flex-col transform transition-transform duration-300 ease-in-out
        inset-x-0 bottom-0 rounded-t-2xl max-h-[85vh] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] md:hidden
        ${isMobileOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center gap-2 text-gray-900 font-semibold">
            <Filter className="h-5 w-5 text-purple-600" /> 
            <span>Filtros ({localFilters.size})</span>
          </div>
          <button 
            onClick={onMobileClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-24">
          <SidebarContent isMobile={true} />
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 pb-safe flex gap-3">
          <button 
            onClick={() => setLocalFilters(new Set())}
            className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 rounded-lg transition-colors"
          >
            Limpiar
          </button>
          <button 
            onClick={applyMobileFilters}
            className="flex-[2] bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
          >
            Aplicar Filtros
          </button>
        </div>
      </div>
    </>
  );
}
