import { Search, Bell, Menu, FileSpreadsheet } from "lucide-react";

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-purple-100 flex items-center justify-between px-4 sm:px-6 shrink-0">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold text-purple-600 flex items-center gap-2">
          <FileSpreadsheet className="h-6 w-6" />
          <span>DataFlow</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Buscar en hojas..." 
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
          />
        </div>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-md relative" title="Notificaciones">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="h-8 w-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-medium">
          JD
        </div>
        <button 
          onClick={onMenuClick}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-md hidden md:block"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
