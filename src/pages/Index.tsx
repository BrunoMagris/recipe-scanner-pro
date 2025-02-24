
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Camera, 
  History as HistoryIcon, 
  Home,
  User,
  HelpCircle,
  Calendar,
  Pill,
  Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Datos de ejemplo para las últimas recetas
  const recentPrescriptions = [
    {
      id: 1,
      medicine: "Paracetamol",
      dosage: "500mg",
      date: "15 Mar 2024",
    },
    {
      id: 2,
      medicine: "Amoxicilina",
      dosage: "250mg",
      date: "14 Mar 2024",
    }
  ];

  const handleScan = () => {
    setLoading(true);
    navigate("/scan");
  };

  return (
    <div className="min-h-screen bg-[#010032] flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 bg-[#0061E9]/10 backdrop-blur-sm supports-[backdrop-filter]:bg-[#0061E9]/10">
        <div className="container max-w-md flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-white">Mi Escáner</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-white hover:bg-white/10"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-md flex flex-col p-4 space-y-6 animate-fadeIn">
        {/* Main Actions */}
        <div className="grid grid-cols-2 gap-4">
          {/* Scan Card */}
          <button
            onClick={handleScan}
            disabled={loading}
            className="relative overflow-hidden group bg-[#0061E9] p-6 rounded-2xl flex flex-col items-center justify-center space-y-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#349AEF] to-[#0061E9] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="bg-white/10 p-4 rounded-xl mb-3">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-white">Escanear</h2>
              <p className="text-sm text-white/70">Nueva receta</p>
            </div>
          </button>

          {/* History Card */}
          <button
            onClick={() => navigate("/history")}
            className="relative overflow-hidden group bg-white/5 p-6 rounded-2xl flex flex-col items-center justify-center space-y-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] border border-white/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="bg-white/10 p-4 rounded-xl mb-3">
                <HistoryIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-white">Historial</h2>
              <p className="text-sm text-white/70">Ver recetas</p>
            </div>
          </button>
        </div>

        {/* Recent Prescriptions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-white">Recetas Recientes</h2>
          <div className="space-y-3">
            {recentPrescriptions.map((prescription) => (
              <button
                key={prescription.id}
                onClick={() => navigate(`/prescription/${prescription.id}`)}
                className="w-full bg-white/5 rounded-xl p-4 flex items-center space-x-4 hover:bg-white/10 transition-colors border border-white/10"
              >
                <div className="bg-[#349AEF]/10 p-3 rounded-lg">
                  <Pill className="h-6 w-6 text-[#349AEF]" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-white font-medium">{prescription.medicine}</h3>
                  <p className="text-sm text-white/70">{prescription.dosage}</p>
                </div>
                <div className="flex items-center text-white/50 text-sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  {prescription.date}
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-[#0061E9]/10 backdrop-blur-sm supports-[backdrop-filter]:bg-[#0061E9]/10 border-t border-white/10">
        <div className="container max-w-md">
          <div className="flex items-center justify-around py-3">
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-col items-center space-y-1 text-white hover:bg-white/10 rounded-xl h-auto py-2"
            >
              <Home className="h-5 w-5" />
              <span className="text-xs">Inicio</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/history")}
              className="flex flex-col items-center space-y-1 text-white/70 hover:text-white hover:bg-white/10 rounded-xl h-auto py-2"
            >
              <HistoryIcon className="h-5 w-5" />
              <span className="text-xs">Historial</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleScan}
              className="flex flex-col items-center space-y-1 text-white/70 hover:text-white hover:bg-white/10 rounded-xl h-auto py-2"
            >
              <Camera className="h-5 w-5" />
              <span className="text-xs">Escanear</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-col items-center space-y-1 text-white/70 hover:text-white hover:bg-white/10 rounded-xl h-auto py-2"
            >
              <User className="h-5 w-5" />
              <span className="text-xs">Usuario</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-col items-center space-y-1 text-white/70 hover:text-white hover:bg-white/10 rounded-xl h-auto py-2"
            >
              <HelpCircle className="h-5 w-5" />
              <span className="text-xs">Ayuda</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
