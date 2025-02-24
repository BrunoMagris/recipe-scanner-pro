
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, FileText, Pill, Clock, Printer, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const PrescriptionDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Datos de ejemplo - en una implementación real vendrían de una base de datos
  const prescription = {
    id: 1,
    date: "2024-03-15",
    doctor: "Dr. Juan Pérez",
    specialization: "Médico General",
    patient: "María González",
    medicine: "Paracetamol",
    dosage: "500mg",
    frequency: "Cada 8 horas",
    duration: "7 días",
    instructions: "Tomar después de las comidas con abundante agua.",
    notes: "Evitar bebidas alcohólicas durante el tratamiento.",
    image: "https://placehold.co/600x400/png",
    status: "Procesada"
  };

  return (
    <div className="min-h-screen bg-medical-50 flex flex-col">
      {/* Header */}
      <header className="py-4 px-4 bg-white shadow-sm">
        <div className="container max-w-md flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
            onClick={() => navigate("/history")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Detalle de Receta</h1>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-md py-6 px-4 space-y-6 animate-fadeIn">
        {/* Status Banner */}
        <div className="bg-medical-100 text-medical-700 px-4 py-2 rounded-lg text-sm font-medium">
          Estado: {prescription.status}
        </div>

        {/* Image Preview */}
        <div className="bg-white rounded-xl p-2 shadow-sm">
          <img
            src={prescription.image}
            alt="Prescription"
            className="w-full aspect-[4/3] object-cover rounded-lg"
          />
        </div>

        {/* Details */}
        <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
          {/* Date and Doctor */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Fecha</span>
              </div>
              <p className="font-medium">{prescription.date}</p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-600">
                <User className="h-4 w-4" />
                <span className="text-sm">Doctor</span>
              </div>
              <p className="font-medium">{prescription.doctor}</p>
              <p className="text-sm text-gray-600">{prescription.specialization}</p>
            </div>
          </div>

          {/* Patient */}
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="h-4 w-4" />
              <span className="text-sm">Paciente</span>
            </div>
            <p className="font-medium">{prescription.patient}</p>
          </div>

          {/* Medication Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <Pill className="h-4 w-4" />
                  <span className="text-sm">Medicamento</span>
                </div>
                <p className="font-medium">{prescription.medicine}</p>
                <p className="text-sm text-medical-600">{prescription.dosage}</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Frecuencia</span>
                </div>
                <p className="font-medium">{prescription.frequency}</p>
                <p className="text-sm text-gray-600">Durante {prescription.duration}</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-600">
              <FileText className="h-4 w-4" />
              <span className="text-sm">Instrucciones</span>
            </div>
            <p className="text-sm text-gray-700">{prescription.instructions}</p>
          </div>

          {/* Notes */}
          {prescription.notes && (
            <div className="space-y-2 pt-2 border-t">
              <span className="text-sm font-medium text-gray-700">Notas adicionales</span>
              <p className="text-sm text-gray-600">{prescription.notes}</p>
            </div>
          )}
        </div>

        {/* Actions */}
        <Button
          className="w-full h-12"
          onClick={() => window.print()}
        >
          <Printer className="mr-2 h-4 w-4" />
          Imprimir Receta
        </Button>
      </main>
    </div>
  );
};

export default PrescriptionDetail;
