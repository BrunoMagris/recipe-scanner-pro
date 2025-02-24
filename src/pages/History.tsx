
import { Button } from "@/components/ui/button";
import { Calendar, User, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  
  // Datos de ejemplo - en una implementación real vendrían de una base de datos
  const prescriptions = [
    {
      id: 1,
      date: "2024-03-15",
      doctor: "Dr. Juan Pérez",
      patient: "María González",
      medicine: "Paracetamol 500mg",
      status: "Procesada"
    },
    {
      id: 2,
      date: "2024-03-14",
      doctor: "Dra. Ana García",
      patient: "Carlos Rodríguez",
      medicine: "Amoxicilina 250mg",
      status: "Procesada"
    }
  ];

  return (
    <div className="min-h-screen bg-medical-50 flex flex-col">
      {/* Header */}
      <header className="py-6 px-4 bg-white shadow-sm">
        <div className="container max-w-md">
          <h1 className="text-2xl font-semibold text-gray-900">Historial de Recetas</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-md py-6 px-4 space-y-4">
        {prescriptions.map((prescription) => (
          <div
            key={prescription.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-medical-600" />
                <span className="text-sm text-gray-600">{prescription.date}</span>
              </div>
              <span className="text-xs font-medium px-2 py-1 bg-medical-100 text-medical-700 rounded-full">
                {prescription.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-medical-600" />
                <span className="text-sm font-medium text-gray-900">
                  Paciente: {prescription.patient}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-medical-600" />
                <span className="text-sm text-gray-700">
                  {prescription.medicine}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Recetado por: {prescription.doctor}
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full mt-2"
              onClick={() => navigate(`/review/${prescription.id}`)}
            >
              Ver Detalles
            </Button>
          </div>
        ))}
      </main>
    </div>
  );
};

export default History;
