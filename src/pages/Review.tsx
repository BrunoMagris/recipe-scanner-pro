
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Check, RotateCcw, Calendar, User, FileText } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [prescriptionData, setPrescriptionData] = useState({
    doctor: "",
    patient: "",
    date: new Date().toISOString().split('T')[0],
    medicine: "",
    dosage: "",
    instructions: "",
  });

  const photo = location.state?.photo;

  if (!photo) {
    navigate("/");
    return null;
  }

  const handleConfirm = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      toast.success("Receta procesada correctamente");
      navigate("/history");
    }, 1500);
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
            onClick={() => navigate("/scan")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">Revisar Receta</h1>
          <div className="w-9" /> {/* Spacer for alignment */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-md py-6 px-4 space-y-6 animate-fadeIn overflow-auto">
        {/* Image Preview */}
        <div className="bg-white rounded-xl p-2 shadow-sm">
          <img
            src={photo}
            alt="Captured prescription"
            className="w-full aspect-[4/3] object-cover rounded-lg"
          />
        </div>

        {/* Prescription Details Form */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Fecha
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="date"
                  value={prescriptionData.date}
                  onChange={(e) => setPrescriptionData(prev => ({...prev, date: e.target.value}))}
                  className="pl-9"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Doctor
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  value={prescriptionData.doctor}
                  onChange={(e) => setPrescriptionData(prev => ({...prev, doctor: e.target.value}))}
                  placeholder="Nombre del doctor"
                  className="pl-9"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Paciente
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                value={prescriptionData.patient}
                onChange={(e) => setPrescriptionData(prev => ({...prev, patient: e.target.value}))}
                placeholder="Nombre del paciente"
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Medicamento y Dosis
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                value={prescriptionData.medicine}
                onChange={(e) => setPrescriptionData(prev => ({...prev, medicine: e.target.value}))}
                placeholder="Ej: Paracetamol 500mg"
                className="pl-9"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Instrucciones
            </label>
            <Textarea
              value={prescriptionData.instructions}
              onChange={(e) => setPrescriptionData(prev => ({...prev, instructions: e.target.value}))}
              className="min-h-[100px] bg-white"
              placeholder="Instrucciones de uso..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => navigate("/scan")}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reintentar
          </Button>
          <Button
            className="flex-1 h-12 bg-medical-600 hover:bg-medical-700"
            onClick={handleConfirm}
            disabled={loading}
          >
            <Check className="mr-2 h-4 w-4" />
            {loading ? "Procesando..." : "Confirmar"}
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Review;
