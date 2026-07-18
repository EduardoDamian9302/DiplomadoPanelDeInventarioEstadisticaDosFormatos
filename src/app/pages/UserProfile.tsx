import { User, Mail, Shield, Bell, Key, LogOut } from "lucide-react";

export function UserProfile() {
  return (
    <div className="flex flex-col h-full bg-transparent p-6 md:p-8 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Perfil de Usuario</h1>
        <p className="text-gray-500 text-sm mt-1">Gestiona tu información personal y opciones de sesión.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Sidebar del Perfil */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
            <div className="h-24 w-24 rounded-full bg-purple-100 border-4 border-white shadow-md mx-auto flex items-center justify-center text-purple-700 text-3xl font-bold mb-4">
              ED
            </div>
            <h2 className="text-lg font-bold text-gray-900">Eduardo Damian</h2>
            <p className="text-gray-500 text-sm mb-4">Administrador</p>
            <button className="w-full py-2 bg-purple-50 text-purple-700 font-medium rounded-lg hover:bg-purple-100 transition-colors text-sm">
              Cambiar Avatar
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-700 rounded-lg font-medium text-sm transition-colors">
                <User className="h-4 w-4" />
                Datos Personales
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors">
                <Bell className="h-4 w-4" />
                Notificaciones
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium text-sm transition-colors">
                <Shield className="h-4 w-4" />
                Seguridad
              </button>
            </div>
            <div className="p-2 border-t border-gray-100">
              <button className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-lg font-medium text-sm transition-colors">
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <User className="h-5 w-5 text-purple-600" />
              Información Personal
            </h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input type="text" defaultValue="Jane" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input type="text" defaultValue="Doe" className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow text-sm" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input type="email" defaultValue="jane.doe@dataflow.com" className="w-full pl-10 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-shadow text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                <input type="text" defaultValue="Administradora" disabled className="w-full p-2.5 bg-gray-50 border border-gray-200 text-gray-500 rounded-lg cursor-not-allowed text-sm" />
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm">
                Guardar Cambios
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Key className="h-5 w-5 text-purple-600" />
              Opciones de Sesión
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Autenticación de Dos Factores (2FA)</h4>
                  <p className="text-xs text-gray-500 mt-1">Añade una capa extra de seguridad a tu cuenta.</p>
                </div>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors text-sm">
                  Activar
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Contraseña</h4>
                  <p className="text-xs text-gray-500 mt-1">Última actualización hace 3 meses.</p>
                </div>
                <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors text-sm shadow-sm">
                  Cambiar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}