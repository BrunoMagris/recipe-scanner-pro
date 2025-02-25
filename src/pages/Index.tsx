
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, History as HistoryIcon, Calendar, Pill, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [recentPrescriptions, setRecentPrescriptions] = useState<any[]>([]);

  useEffect(() => {
    // Cargar las recetas más recientes del localStorage
    const savedPrescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    // Tomar solo las 2 más recientes
    setRecentPrescriptions(savedPrescriptions.slice(0, 2));
  }, []);

  const handleScan = () => {
    setLoading(true);
    navigate("/scan");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Por favor, selecciona una imagen válida");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const photo = e.target?.result as string;
        navigate("/review", { state: { photo } });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <header className="py-6 px-4 bg-white shadow-sm">
        <div className="container max-w-md">
          <h1 className="text-2xl font-semibold text-[#333333]">Mi Escáner</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-md flex flex-col p-4 space-y-6">
        {/* Main Actions */}
        <div className="grid grid-cols-2 gap-4">
          {/* Scan Card */}
          <button
            onClick={handleScan}
            disabled={loading}
            className="relative overflow-hidden group bg-[#236B8E] p-6 rounded-xl flex flex-col items-center justify-center space-y-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#5AB9EA] to-[#236B8E] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="bg-white/10 p-4 rounded-xl mb-3">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-white">Escanear</h2>
              <p className="text-sm text-white/90">Nueva receta</p>
            </div>
          </button>

          {/* History Card */}
          <button
            onClick={() => navigate("/history")}
            className="relative overflow-hidden group bg-[#3A9A64] p-6 rounded-xl flex flex-col items-center justify-center space-y-3 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#3A9A64]/80 to-[#3A9A64] opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="bg-white/10 p-4 rounded-xl mb-3">
                <HistoryIcon className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-lg font-semibold text-white">Historial</h2>
              <p className="text-sm text-white/90">Ver recetas</p>
            </div>
          </button>
        </div>

        {/* Upload Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-[#5AB9EA] hover:bg-[#236B8E] text-white p-6 rounded-xl flex items-center justify-center space-x-3 transition-colors"
        >
          <Upload className="h-6 w-6" />
          <span className="font-medium">Subir imagen de receta</span>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Recent Prescriptions */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-[#333333]">Recetas Recientes</h2>
          <div className="space-y-3">
            {recentPrescriptions.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No hay recetas recientes
              </div>
            ) : (
              recentPrescriptions.map((prescription) => (
                <button
                  key={prescription.id}
                  onClick={() => navigate(`/prescription/${prescription.id}`)}
                  className="w-full bg-white rounded-xl p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors shadow-sm"
                >
                  <div className="bg-[#5AB9EA]/10 p-3 rounded-lg">
                    <Pill className="h-6 w-6 text-[#5AB9EA]" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-[#333333] font-medium">{prescription.medicine}</h3>
                    <p className="text-sm text-gray-500">{prescription.dosage}</p>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {prescription.date}
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default Index;
