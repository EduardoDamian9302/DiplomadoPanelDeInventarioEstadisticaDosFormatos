import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { SettingsPanel } from "./SettingsPanel";
import { useState } from "react";

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gradient-to-t from-purple-200 via-purple-50 to-white text-gray-900 font-sans overflow-hidden dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 dark:text-gray-100 transition-colors">
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto relative flex">
          <div className="flex-1 overflow-y-auto pb-16 md:pb-0">
            <Outlet />
          </div>
          <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} onSettingsClick={() => setIsSettingsOpen(true)} />
          <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </main>
      </div>
    </div>
  );
}
