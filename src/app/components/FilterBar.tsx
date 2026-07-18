import { Filter, ArrowUpDown, Calendar, Plus, Download, X, Trash2 } from "lucide-react";

interface FilterBarProps {
  activeFilters?: string[];
  onRemoveFilter?: (filter: string) => void;
  onResetFilters?: () => void;
  onExportClick?: () => void;
  onMobileFilterClick?: () => void;
}

export function FilterBar({ 
  activeFilters = [], 
  onRemoveFilter = () => {}, 
  onResetFilters = () => {}, 
  onExportClick = () => {},
  onMobileFilterClick = () => {}
}: FilterBarProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b border-purple-100 p-4 flex flex-col gap-4 sticky top-0 z-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Pills y Botón móvil */}
        <div className="flex items-center gap-2 flex-wrap flex-1">
          {/* Botón Filtros (Móvil y Escritorio) */}
          <button 
            onClick={onMobileFilterClick}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700 text-sm font-medium rounded-md transition-colors"
          >
            <Filter className="h-4 w-4" />
            Filtros {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>

          {/* Tokens / Pills */}
          {activeFilters.length > 0 && (
            <>
              <button 
                onClick={onResetFilters}
                className="flex items-center gap-1.5 px-2.5 py-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold rounded-full transition-colors shadow-sm"
              >
                <Trash2 className="h-3 w-3" />
                Borrar todos
              </button>
              
              <div className="hidden sm:block h-4 w-px bg-gray-300 mx-1"></div>
              
              {activeFilters.map(filter => (
                <span key={filter} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200 shadow-sm animate-in fade-in zoom-in duration-200">
                  {filter}
                  <button 
                    onClick={() => onRemoveFilter(filter)}
                    className="hover:bg-purple-200 hover:text-purple-900 rounded-full p-0.5 transition-colors"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </>
          )}
          
          {activeFilters.length === 0 && (
            <span className="hidden md:inline-block text-sm text-gray-400 italic">No hay filtros aplicados</span>
          )}
        </div>
        
        {/* Acciones principales */}
        <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
          <button 
            onClick={onExportClick}
            className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium rounded-md transition-colors shadow-sm"
          >
            <Download className="h-4 w-4" />
            Exportar
          </button>
          <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors shadow-sm">
            <Plus className="h-4 w-4" />
            Nueva Hoja
          </button>
        </div>
      </div>
    </div>
  );
}
