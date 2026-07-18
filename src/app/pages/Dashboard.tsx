import { FilterBar } from "../components/FilterBar";
import { FilterSidebar } from "../components/FilterSidebar";
import { MoreHorizontal, FileText, ArrowUpRight, ArrowDownRight, Settings2, Info, ChevronDown, ChevronUp, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { CellPanel } from "../components/CellPanel";
import { ExportPanel } from "../components/ExportPanel";

// Datos de prueba para simular celdas de hojas de cálculo
const initialData = [
  { id: 'A1', title: 'Q1 Ventas', value: '$45,231', trend: 'up', change: '+12.5%', status: 'Completado', date: '24 Jun 2026' },
  { id: 'B1', title: 'Usuarios Activos', value: '2,405', trend: 'up', change: '+4.2%', status: 'En progreso', date: '24 Jun 2026' },
  { id: 'C1', title: 'Tasa de Rebote', value: '32.1%', trend: 'down', change: '-2.4%', status: 'Pendiente', date: '23 Jun 2026' },
  { id: 'A2', title: 'Gastos Q1', value: '$12,450', trend: 'down', change: '-1.5%', status: 'Completado', date: '22 Jun 2026' },
  { id: 'B2', title: 'Nuevos Leads', value: '142', trend: 'up', change: '+8.1%', status: 'En progreso', date: '21 Jun 2026' },
  { id: 'C2', title: 'Conversión', value: '4.8%', trend: 'up', change: '+1.2%', status: 'Pendiente', date: '20 Jun 2026' },
  { id: 'A3', title: 'Ingresos MRR', value: '$84,302', trend: 'up', change: '+15.3%', status: 'Completado', date: '19 Jun 2026' },
  { id: 'B3', title: 'Cancelaciones', value: '12', trend: 'down', change: '-5.0%', status: 'Pendiente', date: '18 Jun 2026' },
  { id: 'C3', title: 'Sesiones', value: '45.2k', trend: 'up', change: '+22.4%', status: 'Completado', date: '17 Jun 2026' },
];

function EditableNumber({ value, onSave, className }: { value: string, onSave: (val: string) => void, className?: string }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const validateAndSave = () => {
    // Si la cadena no contiene ningún número (excluyendo k, m, etc para simplificar), es error
    const hasNumbers = /\d/.test(editValue);
    if (!hasNumbers && editValue.trim() !== '') {
      setError(true);
      setTimeout(() => setError(false), 500); // Quitar estado de error después de la animación
      return;
    }
    
    setError(false);
    setIsEditing(false);
    if (editValue !== value) {
      onSave(editValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateAndSave();
    } else if (e.key === 'Escape') {
      setEditValue(value);
      setError(false);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={validateAndSave}
        onKeyDown={handleKeyDown}
        className={`bg-white border rounded px-1.5 py-0.5 outline-none w-24 sm:w-28 text-gray-900 ${
          error ? 'border-red-500 text-red-500 animate-shake ring-2 ring-red-200' : 'border-purple-300 ring-2 ring-purple-100'
        } ${className}`}
      />
    );
  }

  return (
    <div 
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-gray-100/80 rounded px-1 -mx-1 transition-colors ${className}`}
      title="Haz clic para editar"
    >
      {value}
    </div>
  );
}

export function Dashboard() {
  const [data, setData] = useState(initialData);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  
  const [panelState, setPanelState] = useState<{isOpen: boolean, type: 'none' | 'customize' | 'details', cell: any}>({
    isOpen: false,
    type: 'none',
    cell: null
  });

  const openPanel = (type: 'customize' | 'details', cell: any) => {
    setPanelState({ isOpen: true, type, cell });
  };

  const closePanel = () => {
    setPanelState(prev => ({ ...prev, isOpen: false }));
  };

  const updateCellValue = (id: string, newValue: string) => {
    setData(prev => prev.map(cell => cell.id === id ? { ...cell, value: newValue } : cell));
  };

  const toggleCardCollapse = (id: string) => {
    const next = new Set(expandedCards);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedCards(next);
  };
  
  const toggleCellSelection = (id: string) => {
    const next = new Set(selectedCells);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedCells(next);
  };

  const addFilter = (filterText: string) => {
    if (!activeFilters.includes(filterText)) {
      setActiveFilters(prev => [...prev, filterText]);
    }
  };

  const removeFilter = (filter: string) => {
    setActiveFilters(prev => prev.filter(f => f !== filter));
  };

  const resetFilters = () => {
    setActiveFilters([]);
  };

  // Filtrar datos
  const filteredData = data.filter(cell => {
    if (activeFilters.length === 0) return true;
    
    // Simplificación para filtros compuestos
    const statusFilters = activeFilters.filter(f => f.startsWith('Estado: ')).map(f => f.replace('Estado: ', ''));
    const trendFilters = activeFilters.filter(f => f.startsWith('Tendencia: ')).map(f => f.replace('Tendencia: ', ''));
    const dateFilters = activeFilters.filter(f => f.startsWith('Fecha: ')).map(f => f.replace('Fecha: ', ''));

    let matchesStatus = true;
    let matchesTrend = true;
    let matchesDate = true;

    if (statusFilters.length > 0) {
      matchesStatus = statusFilters.includes(cell.status);
    }
    
    if (trendFilters.length > 0) {
      const cellTrendStr = cell.trend === 'up' ? 'Positiva' : 'Negativa';
      matchesTrend = trendFilters.includes(cellTrendStr);
    }

    return matchesStatus && matchesTrend && matchesDate;
  });

  return (
    <div className="flex flex-col md:flex-row h-full bg-transparent overflow-hidden">
      <FilterSidebar 
        activeFilters={activeFilters}
        onAddFilter={addFilter}
        onRemoveFilter={removeFilter}
        isMobileOpen={isMobileFilterOpen}
        onMobileClose={() => setIsMobileFilterOpen(false)}
      />

      {/* Overlay para móvil */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden transition-opacity"
          onClick={() => setIsMobileFilterOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <FilterBar 
          activeFilters={activeFilters}
          onRemoveFilter={removeFilter}
          onResetFilters={resetFilters}
          onExportClick={() => setIsExportOpen(true)}
          onMobileFilterClick={() => setIsMobileFilterOpen(true)}
        />
      <div className="p-4 md:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Inicio</h1>
            <p className="text-gray-500 text-sm mt-1">Gestiona y visualiza tus datos en formato de lista.</p>
          </div>
        </div>
        
        {/* Lista de Celdas */}
        <div className="flex flex-col gap-3">
          {filteredData.map((cell) => {
            const isSelected = panelState.isOpen && panelState.cell?.id === cell.id;
            const isExpanded = expandedCards.has(cell.id);
            
            return (
            <div 
              key={cell.id} 
              className={`rounded-xl shadow-sm hover:shadow-md transition-all p-4 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 group ${
                isSelected 
                  ? 'bg-purple-50/90 border-2 border-purple-400' 
                  : 'bg-white/90 backdrop-blur-sm border border-gray-200/60'
              }`}
            >
              {/* Header / Info principal (Siempre visible) */}
              <div className="flex items-center justify-between sm:justify-start gap-4 min-w-0 sm:min-w-[200px] w-full sm:w-auto">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center shrink-0">
                    <input 
                      type="checkbox" 
                      checked={selectedCells.has(cell.id)}
                      onChange={() => toggleCellSelection(cell.id)}
                      className="h-5 w-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                  </div>
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-purple-50/80 border border-purple-100 flex items-center justify-center text-purple-600 shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-purple-400 mb-0.5 tracking-wider truncate">CELDA {cell.id}</div>
                    <h3 className="text-sm font-medium text-gray-900 leading-tight truncate pr-2">{cell.title}</h3>
                  </div>
                </div>
                
                {/* Botón de expandir (Solo móvil) */}
                <button 
                  className="sm:hidden p-2 text-gray-400 hover:text-gray-600 rounded-md"
                  onClick={() => toggleCardCollapse(cell.id)}
                >
                  {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                </button>
              </div>
              
              {/* Contenido Colapsable (Móvil) / Siempre visible (Desktop) */}
              <div className={`flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between sm:justify-start gap-4 sm:gap-8 border-t border-gray-100 sm:border-none pt-4 sm:pt-0 ${
                isExpanded ? 'flex' : 'hidden sm:flex'
              }`}>
                <div className="sm:w-32 flex sm:block items-center justify-between w-full">
                  <span className="sm:hidden text-xs text-gray-500 font-medium">Valor</span>
                  <div>
                    <EditableNumber 
                      value={cell.value} 
                      onSave={(val) => updateCellValue(cell.id, val)}
                      className="text-base sm:text-lg font-semibold tracking-tight inline-block"
                    />
                    <div className={`flex items-center gap-1 text-xs mt-0.5 ${cell.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {cell.trend === 'up' ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      <span className="font-medium">{cell.change}</span>
                    </div>
                  </div>
                </div>

                <div className="sm:block text-sm text-gray-500 sm:w-32 flex items-center justify-between w-full">
                  <span className="sm:hidden text-xs font-medium">Fecha</span>
                  <span>{cell.date}</span>
                </div>

                <div className="flex items-center justify-between sm:justify-end flex-1 gap-2 w-full sm:w-auto">
                  <span className="sm:hidden text-xs text-gray-500 font-medium">Estado</span>
                  <div className="flex items-center gap-2 justify-end flex-1">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-medium border ${
                      cell.status === 'Completado' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      cell.status === 'En progreso' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      'bg-gray-50 text-gray-700 border-gray-200'
                    }`}>
                      {cell.status}
                    </span>
                    
                    <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity ml-2">
                      <button 
                        onClick={() => openPanel('customize', cell)}
                        className={`p-2 rounded-md transition-all tooltip-trigger ${
                          isSelected && panelState.type === 'customize' ? 'text-purple-700 bg-purple-100' : 'text-gray-400 hover:text-purple-600 hover:bg-purple-50'
                        }`}
                        title="Personalizar"
                      >
                        <Settings2 className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => openPanel('details', cell)}
                        className={`p-2 rounded-md transition-all tooltip-trigger ${
                          isSelected && panelState.type === 'details' ? 'text-blue-700 bg-blue-100' : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                        }`}
                        title="Detalles"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
          {filteredData.length === 0 && (
            <div className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200/60">
              <p className="text-gray-500">No hay resultados para los filtros aplicados.</p>
              <button 
                onClick={resetFilters}
                className="mt-2 text-purple-600 font-medium hover:text-purple-700 text-sm"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>
      
      <CellPanel 
        isOpen={panelState.isOpen}
        type={panelState.type}
        cell={panelState.cell}
        onClose={closePanel}
      />

      <ExportPanel
        isOpen={isExportOpen}
        hasSelectedRows={selectedCells.size > 0}
        onClose={() => setIsExportOpen(false)}
        onExport={(format, type) => {
          console.log(`Exportando en formato ${format}, tipo: ${type}`);
        }}
      />
      </div>
    </div>
  );
}
