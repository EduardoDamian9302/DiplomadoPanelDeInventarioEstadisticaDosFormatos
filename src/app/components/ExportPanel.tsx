import { X, Download, FileJson, FileText, FileSpreadsheet, FileIcon } from "lucide-react";
import { useState } from "react";

interface ExportPanelProps {
  isOpen: boolean;
  hasSelectedRows: boolean;
  onClose: () => void;
  onExport: (format: string, type: 'all' | 'selected') => void;
}

export function ExportPanel({ isOpen, hasSelectedRows, onClose, onExport }: ExportPanelProps) {
  const [format, setFormat] = useState<string>('csv');
  const [exportType, setExportType] = useState<'all' | 'selected'>('all');

  // Si se abre el panel y no hay filas seleccionadas, forzar 'all'
  if (!hasSelectedRows && exportType === 'selected') {
    setExportType('all');
  }

  const handleExport = () => {
    onExport(format, exportType);
    onClose();
  };

  return (
    <>
      <div 
        className={`fixed z-50 bg-white flex flex-col transform transition-transform duration-300 ease-in-out
        inset-x-0 bottom-0 rounded-t-2xl max-h-[85vh] shadow-[0_-8px_30px_rgba(0,0,0,0.12)]
        md:inset-y-0 md:right-0 md:left-auto md:w-96 md:rounded-none md:max-h-none md:border-l md:border-gray-200 md:shadow-2xl
        ${isOpen 
          ? 'translate-y-0 md:translate-x-0' 
          : 'translate-y-full md:translate-y-0 md:translate-x-full'
        }`}
      >
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 bg-white shrink-0">
          <div className="flex items-center gap-2 text-gray-900 font-semibold">
            <Download className="h-5 w-5 text-purple-600" /> 
            <span>Exportar Datos</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-24 md:pb-6">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Formato de Exportación</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'csv', name: 'CSV', icon: FileText, desc: 'Valores separados por comas' },
                { id: 'xlsx', name: 'XLSX', icon: FileSpreadsheet, desc: 'Microsoft Excel' },
                { id: 'json', name: 'JSON', icon: FileJson, desc: 'JavaScript Object Notation' },
                { id: 'pdf', name: 'PDF', icon: FileIcon, desc: 'Documento Portable' }
              ].map(f => (
                <button
                  key={f.id}
                  onClick={() => setFormat(f.id)}
                  className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all ${
                    format === f.id 
                      ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' 
                      : 'border-gray-200 bg-white hover:border-purple-200 hover:bg-gray-50'
                  }`}
                >
                  <f.icon className={`h-5 w-5 mb-2 ${format === f.id ? 'text-purple-600' : 'text-gray-500'}`} />
                  <span className={`font-semibold text-sm ${format === f.id ? 'text-purple-900' : 'text-gray-900'}`}>
                    {f.name}
                  </span>
                  <span className={`text-xs mt-1 ${format === f.id ? 'text-purple-700' : 'text-gray-500'}`}>
                    {f.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Alcance de los Datos</h3>
            <div className="space-y-2">
              <label className={`flex items-center p-3 border rounded-xl cursor-pointer transition-colors ${
                exportType === 'all' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:bg-gray-50'
              }`}>
                <input 
                  type="radio" 
                  name="exportType"
                  value="all"
                  checked={exportType === 'all'}
                  onChange={() => setExportType('all')}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                />
                <span className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">Exportar todos los datos</span>
                  <span className="block text-xs text-gray-500">Incluye todas las filas con los filtros actuales aplicados.</span>
                </span>
              </label>
              
              <label className={`flex items-center p-3 border rounded-xl transition-colors ${
                !hasSelectedRows 
                  ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50' 
                  : exportType === 'selected' 
                    ? 'border-purple-500 bg-purple-50 cursor-pointer' 
                    : 'border-gray-200 hover:bg-gray-50 cursor-pointer'
              }`}>
                <input 
                  type="radio" 
                  name="exportType"
                  value="selected"
                  checked={exportType === 'selected'}
                  onChange={() => hasSelectedRows && setExportType('selected')}
                  disabled={!hasSelectedRows}
                  className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 disabled:opacity-50"
                />
                <span className="ml-3">
                  <span className="block text-sm font-medium text-gray-900">Solo filas seleccionadas</span>
                  <span className="block text-xs text-gray-500">
                    {!hasSelectedRows ? 'Selecciona al menos una fila para usar esta opción.' : 'Exporta únicamente las filas marcadas manualmente.'}
                  </span>
                </span>
              </label>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 pb-safe">
          <button 
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 md:py-2 px-4 rounded-lg transition-colors"
          >
            <Download className="h-4 w-4" />
            Exportar como {format.toUpperCase()}
          </button>
        </div>
      </div>

      {/* Overlay para móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}
    </>
  );
}
