
import { Navigation } from "@/components/Navigation";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Cómo escaneo una receta médica?",
      answer: "Para escanear una receta médica, simplemente presiona el botón 'Escanear' en la navegación inferior o en la página principal. Asegúrate de tener buena iluminación y mantener la receta sobre una superficie plana."
    },
    {
      question: "¿Dónde puedo ver mi historial de recetas?",
      answer: "Puedes acceder a tu historial de recetas a través del botón 'Historial' en la navegación inferior. Allí encontrarás todas tus recetas escaneadas organizadas por fecha."
    },
    {
      question: "¿Es segura mi información médica?",
      answer: "Sí, tu información médica está protegida con los más altos estándares de seguridad. Utilizamos encriptación de extremo a extremo y cumplimos con todas las regulaciones de protección de datos médicos."
    },
    {
      question: "¿Puedo compartir mis recetas con mi médico o farmacia?",
      answer: "Sí, puedes compartir tus recetas fácilmente desde la página de detalles de cada receta. Busca el botón de compartir y selecciona el método que prefieras."
    },
    {
      question: "¿Cómo actualizo mi información personal?",
      answer: "Puedes actualizar tu información personal desde la sección de 'Usuario' en la navegación inferior. Allí encontrarás opciones para editar tu perfil y gestionar tu cuenta."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* Header */}
      <header className="bg-white py-6 px-4 shadow-sm">
        <div className="container max-w-md">
          <h1 className="text-2xl font-semibold text-[#333333]">Preguntas Frecuentes</h1>
        </div>
      </header>

      {/* FAQs */}
      <main className="container max-w-md p-4">
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => setOpenQuestion(openQuestion === index ? null : index)}
                className="w-full flex items-center justify-between p-4 text-left text-[#333333]"
              >
                <span className="font-medium">{faq.question}</span>
                <ChevronDown className={`h-5 w-5 text-[#5AB9EA] transition-transform ${
                  openQuestion === index ? "transform rotate-180" : ""
                }`} />
              </button>
              {openQuestion === index && (
                <div className="px-4 pb-4 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Navigation />
    </div>
  );
};

export default FAQ;
