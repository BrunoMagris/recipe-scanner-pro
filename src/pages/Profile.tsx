
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { User, Settings, Bell, Shield, LogOut } from "lucide-react";

const Profile = () => {
  const user = {
    name: "Juan Pérez",
    email: "juan.perez@ejemplo.com",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Juan"
  };

  const menuItems = [
    { icon: Settings, label: "Configuración", action: () => {} },
    { icon: Bell, label: "Notificaciones", action: () => {} },
    { icon: Shield, label: "Privacidad", action: () => {} },
    { icon: LogOut, label: "Cerrar Sesión", action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <header className="bg-white py-6 px-4 shadow-sm">
        <div className="container max-w-md">
          <h1 className="text-2xl font-semibold text-[#333333]">Mi Perfil</h1>
        </div>
      </header>

      {/* Profile Info */}
      <main className="container max-w-md p-4 space-y-6">
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatarUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full bg-[#5AB9EA]/10"
            />
            <div>
              <h2 className="text-xl font-semibold text-[#333333]">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          <Button
            className="w-full bg-[#236B8E] hover:bg-[#236B8E]/90"
          >
            Editar Perfil
          </Button>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`w-full flex items-center space-x-3 p-4 text-left text-[#333333] hover:bg-[#F8F9FA] transition-colors ${
                index !== menuItems.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <item.icon className="h-5 w-5 text-[#5AB9EA]" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Profile;
