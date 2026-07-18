import { X, Settings2, Info, TrendingUp, Calendar, Hash, Download, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface CellPanelProps {
  isOpen: boolean;
  type: 'none' | 'customize' | 'details';
  cell: any | null;
  onClose: () => void;
}

export function CellPanel({ isOpen, type, cell, onClose }: CellPanelProps) {
  const [copied, setCopied] = useState(false);

  if (!cell && isOpen) return null;

  const getMarkdown = () => {
    if (!cell) return '';
    return `# ${cell.title}
**ID de Celda:** ${cell.id}
**Valor Actual:** ${cell.value}
**Variación:** ${cell.change} (${cell.trend === 'up' ? 'Positiva' : 'Negativa'})
**Estado:** ${cell.status}
**Última actualización:** ${cell.date}`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            {type === 'customize' && <><Settings2 className="h-5 w-5 text-purple-600" /> Personalizar Celda</>}
            {type === 'details' && <><Info className="h-5 w-5 text-blue-600" /> Detalles de Celda</>}
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-24 md:pb-6">
          {cell && (
            <div className="mb-6 pb-6 border-b border-gray-100">
              <div className="text-xs font-bold text-gray-400 mb-1 tracking-wider">CELDA {cell.id}</div>
              <h2 className="text-xl font-bold text-gray-900">{cell.title}</h2>
            </div>
          )}

          {type === 'details' && cell && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm">
                    <Hash className="h-4 w-4" /> Valor Actual
                  </div>
                  <div className="text-xl font-semibold text-gray-900">{cell.value}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2 text-gray-500 mb-2 text-sm">
                    <TrendingUp className="h-4 w-4" /> Variación
                  </div>
                  <div className={`text-xl font-semibold ${cell.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {cell.change}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Información Adicional</h3>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500 text-sm flex items-center gap-2">
                    <Calendar className="h-4 w-4" /> Última actualización
                  </span>
                  <span className="text-sm font-medium text-gray-900">{cell.date}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-50">
                  <span className="text-gray-500 text-sm">Estado actual</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border ${
                    cell.status === 'Completado' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    cell.status === 'En progreso' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    'bg-gray-50 text-gray-700 border-gray-200'
                  }`}>
                    {cell.status}
                  </span>
                </div>
              </div>
            </div>
          )}

          {type === 'customize' && cell && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Título de la métrica</label>
                <input 
                  type="text" 
                  defaultValue={cell.title}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Formato de valor</label>
                <select className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white">
                  <option>Moneda ($)</option>
                  <option>Porcentaje (%)</option>
                  <option>Número entero</option>
                  <option>Texto libre</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">Color de alerta</label>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-emerald-500 ring-2 ring-offset-2 ring-emerald-500"></button>
                  <button className="w-8 h-8 rounded-full bg-blue-500 hover:ring-2 ring-offset-2 ring-blue-500 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-purple-500 hover:ring-2 ring-offset-2 ring-purple-500 transition-all"></button>
                  <button className="w-8 h-8 rounded-full bg-rose-500 hover:ring-2 ring-offset-2 ring-rose-500 transition-all"></button>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {type === 'customize' && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0 pb-safe">
            <button 
              onClick={onClose}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 md:py-2 px-4 rounded-lg transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        )}
      </div>
    </>
  );
}
