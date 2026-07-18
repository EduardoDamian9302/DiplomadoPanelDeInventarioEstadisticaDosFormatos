import { X, Moon, Sun, Monitor, Type, LayoutGrid, Maximize, Minimize } from "lucide-react";
import { useState, useEffect } from "react";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light');
  const [uiSize, setUiSize] = useState<'compact' | 'normal' | 'large'>('normal');

  // Aplicar tema oscuro (simulado con clases)
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Aplicar tamaño de UI (ejemplo ajustando el tamaño base de la fuente)
  useEffect(() => {
    const root = document.documentElement;
    if (uiSize === 'compact') {
      root.style.fontSize = '14px';
    } else if (uiSize === 'large') {
      root.style.fontSize = '18px';
    } else {
      root.style.fontSize = '16px'; // normal
    }
  }, [uiSize]);

  return (
    <>
      <div 
        className={`fixed z-50 bg-white dark:bg-gray-900 flex flex-col transform transition-transform duration-300 ease-in-out
        inset-y-0 right-0 w-full md:w-96 shadow-2xl border-l border-gray-200 dark:border-gray-800
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
          <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 font-semibold">
            <SettingsIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" /> 
            <span>Ajustes</span>
          </div>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* SECCIÓN MODO OSCURO */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider">Apariencia</h3>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setTheme('light')}
                className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                  theme === 'light' 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-500' 
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Sun className={`h-6 w-6 mb-2 ${theme === 'light' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`} />
                <span className={`text-sm font-medium ${theme === 'light' ? 'text-purple-900 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'}`}>Claro</span>
              </button>

              <button
                onClick={() => setTheme('dark')}
                className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                  theme === 'dark' 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-500' 
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Moon className={`h-6 w-6 mb-2 ${theme === 'dark' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`} />
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-purple-900 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'}`}>Oscuro</span>
              </button>

              <button
                onClick={() => setTheme('system')}
                className={`flex flex-col items-center p-3 rounded-xl border transition-all ${
                  theme === 'system' 
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 ring-1 ring-purple-500' 
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <Monitor className={`h-6 w-6 mb-2 ${theme === 'system' ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400'}`} />
                <span className={`text-sm font-medium ${theme === 'system' ? 'text-purple-900 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'}`}>Sistema</span>
              </button>
            </div>
          </div>

          {/* SECCIÓN TAMAÑO DE ELEMENTOS */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider">Tamaño de Elementos</h3>
            <div className="space-y-3">
              
              <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${
                uiSize === 'compact' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}>
                <input 
                  type="radio" 
                  name="uiSize"
                  checked={uiSize === 'compact'}
                  onChange={() => setUiSize('compact')}
                  className="mt-0.5 w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center gap-2">
                    <Minimize className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">Compacto</span>
                  </div>
                  <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Más datos en pantalla. Márgenes y fuentes reducidas.</span>
                </div>
              </label>

              <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${
                uiSize === 'normal' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}>
                <input 
                  type="radio" 
                  name="uiSize"
                  checked={uiSize === 'normal'}
                  onChange={() => setUiSize('normal')}
                  className="mt-0.5 w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">Normal</span>
                  </div>
                  <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Equilibrio ideal. Recomendado para la mayoría de pantallas.</span>
                </div>
              </label>

              <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-colors ${
                uiSize === 'large' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}>
                <input 
                  type="radio" 
                  name="uiSize"
                  checked={uiSize === 'large'}
                  onChange={() => setUiSize('large')}
                  className="mt-0.5 w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600"
                />
                <div className="ml-3 flex-1">
                  <div className="flex items-center gap-2">
                    <Maximize className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">Grande</span>
                  </div>
                  <span className="block text-xs text-gray-500 dark:text-gray-400 mt-1">Mejor accesibilidad. Fuentes grandes y controles espaciosos.</span>
                </div>
              </label>

            </div>
          </div>

        </div>
        
        <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 shrink-0 pb-safe">
          <button 
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            Listo
          </button>
        </div>
      </div>

      {/* Overlay para móviles */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={onClose}
        />
      )}
    </>
  );
}

// Pequeño helper icon
function SettingsIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}
