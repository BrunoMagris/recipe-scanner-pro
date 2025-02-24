
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleScan = () => {
    setLoading(true);
    navigate("/scan");
  };

  return (
    <div className="min-h-screen bg-medical-50 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 bg-white shadow-sm">
        <div className="container max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900">Escáner de Recetas</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-md flex flex-col items-center justify-center p-4 space-y-8 animate-fadeIn">
        {/* Instructions Card */}
        <div className="w-full bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-medical-600 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Instrucciones
              </h2>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>1. Coloque la receta sobre una superficie plana</li>
                <li>2. Centre la receta en el marco de la cámara</li>
                <li>3. Asegúrese de que haya buena iluminación</li>
                <li>4. Capture la imagen cuando esté lista</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Scan Button */}
        <Button
          onClick={handleScan}
          disabled={loading}
          className="w-full max-w-sm h-14 bg-medical-600 hover:bg-medical-700 text-white rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <Camera className="mr-2 h-5 w-5" />
          {loading ? "Iniciando cámara..." : "Escanear Receta"}
        </Button>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4">
        <div className="container max-w-md text-center">
          <p className="text-sm text-gray-500">
            Coloque la receta en una superficie bien iluminada para obtener mejores resultados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
