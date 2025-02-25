
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const EditPrescription = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [prescriptionData, setPrescriptionData] = useState<any>(null);

  useEffect(() => {
    const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    const prescription = prescriptions.find((p: any) => p.id === Number(id));
    
    if (!prescription) {
      toast.error("Receta no encontrada");
      navigate("/history");
      return;
    }

    setPrescriptionData(prescription);
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPrescriptionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const prescriptions = JSON.parse(localStorage.getItem('prescriptions') || '[]');
    const updatedPrescriptions = prescriptions.map((p: any) => 
      p.id === Number(id) ? prescriptionData : p
    );
    
    localStorage.setItem('prescriptions', JSON.stringify(updatedPrescriptions));
    toast.success("Receta actualizada correctamente");
    navigate("/history");
  };

  if (!prescriptionData) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col pb-20">
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
          <h1 className="text-lg font-semibold text-gray-900">Editar Receta</h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container max-w-md py-6 px-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-xl p-2 shadow-sm">
            <img
              src={prescriptionData.photo}
              alt="Prescription"
              className="w-full aspect-[4/3] object-cover rounded-lg"
            />
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm space-y-4">
            {/* Date */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Fecha
              </label>
              <Input
                type="date"
                name="date"
                value={prescriptionData.date}
                onChange={handleChange}
              />
            </div>

            {/* Doctor */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Doctor</label>
              <Input
                name="doctor"
                value={prescriptionData.doctor}
                onChange={handleChange}
              />
            </div>

            {/* Patient */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Paciente</label>
              <Input
                name="patient"
                value={prescriptionData.patient}
                onChange={handleChange}
              />
            </div>

            {/* Medicine */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Medicamento</label>
              <Input
                name="medicine"
                value={prescriptionData.medicine}
                onChange={handleChange}
              />
            </div>

            {/* Dosage */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Dosis</label>
              <Input
                name="dosage"
                value={prescriptionData.dosage}
                onChange={handleChange}
              />
            </div>

            {/* Frequency */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Frecuencia</label>
              <Input
                name="frequency"
                value={prescriptionData.frequency}
                onChange={handleChange}
              />
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Duración</label>
              <Input
                name="duration"
                value={prescriptionData.duration}
                onChange={handleChange}
              />
            </div>

            {/* Instructions */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Instrucciones</label>
              <Textarea
                name="instructions"
                value={prescriptionData.instructions}
                onChange={handleChange}
                rows={3}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <label className="text-sm text-gray-600">Notas adicionales</label>
              <Textarea
                name="notes"
                value={prescriptionData.notes}
                onChange={handleChange}
                rows={2}
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-[#236B8E] hover:bg-[#236B8E]/90"
          >
            Guardar Cambios
          </Button>
        </form>
      </main>

      <Navigation />
    </div>
  );
};

export default EditPrescription;
