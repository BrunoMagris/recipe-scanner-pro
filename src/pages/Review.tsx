
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Check, RotateCcw } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recognizedText, setRecognizedText] = useState(
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  );

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
      navigate("/");
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
      <main className="flex-1 container max-w-md py-6 px-4 space-y-6 animate-fadeIn">
        {/* Image Preview */}
        <div className="bg-white rounded-xl p-2 shadow-sm">
          <img
            src={photo}
            alt="Captured prescription"
            className="w-full aspect-[4/3] object-cover rounded-lg"
          />
        </div>

        {/* Text Recognition Result */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Texto Reconocido
          </label>
          <Textarea
            value={recognizedText}
            onChange={(e) => setRecognizedText(e.target.value)}
            className="min-h-[200px] bg-white"
            placeholder="El texto reconocido aparecerá aquí..."
          />
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
