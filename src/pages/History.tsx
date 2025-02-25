
import { Button } from "@/components/ui/button";
import { Calendar, User, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useEffect, useState } from "react";

const History = () => {
  const navigate = useNavigate();
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    // Cargar recetas guardadas
    const savedPrescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    setPrescriptions(savedPrescriptions);
  }, []);
  
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col pb-20">
      {/* Header */}
      <header className="py-6 px-4 bg-white shadow-sm">
        <div className="container max-w-md">
          <h1 className="text-2xl font-semibold text-[#333333]">Historial de Recetas</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-md py-6 px-4 space-y-4">
        {prescriptions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay recetas guardadas
          </div>
        ) : (
          prescriptions.map((prescription: any) => (
            <div
              key={prescription.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-[#5AB9EA]" />
                  <span className="text-sm text-gray-600">{prescription.date}</span>
                </div>
                <span className="text-xs font-medium px-2 py-1 bg-[#5AB9EA]/10 text-[#236B8E] rounded-full">
                  {prescription.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-[#5AB9EA]" />
                  <span className="text-sm font-medium text-gray-900">
                    Paciente: {prescription.patient}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-[#5AB9EA]" />
                  <span className="text-sm text-gray-700">
                    {prescription.medicine} {prescription.dosage}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Recetado por: {prescription.doctor}
                </p>
              </div>

              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={() => navigate(`/prescription/${prescription.id}`)}
              >
                Ver Detalles
              </Button>
            </div>
          ))
        )}
      </main>

      <Navigation />
    </div>
  );
};

export default History;
