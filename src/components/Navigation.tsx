
import { Button } from "@/components/ui/button";
import { 
  Home,
  History as HistoryIcon,
  Camera,
  User,
  HelpCircle
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 left-0 right-0">
      <div className="container max-w-md">
        <div className="flex items-center justify-around py-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className={`flex flex-col items-center space-y-1 rounded-xl h-auto py-2 ${
              isActive("/") ? "text-[#5AB9EA]" : "text-gray-500 hover:text-[#5AB9EA]"
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs">Inicio</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/history")}
            className={`flex flex-col items-center space-y-1 rounded-xl h-auto py-2 ${
              isActive("/history") ? "text-[#5AB9EA]" : "text-gray-500 hover:text-[#5AB9EA]"
            }`}
          >
            <HistoryIcon className="h-5 w-5" />
            <span className="text-xs">Historial</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/scan")}
            className={`flex flex-col items-center space-y-1 rounded-xl h-auto py-2 ${
              isActive("/scan") ? "text-[#5AB9EA]" : "text-gray-500 hover:text-[#5AB9EA]"
            }`}
          >
            <Camera className="h-5 w-5" />
            <span className="text-xs">Escanear</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className={`flex flex-col items-center space-y-1 rounded-xl h-auto py-2 ${
              isActive("/profile") ? "text-[#5AB9EA]" : "text-gray-500 hover:text-[#5AB9EA]"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Usuario</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/faq")}
            className={`flex flex-col items-center space-y-1 rounded-xl h-auto py-2 ${
              isActive("/faq") ? "text-[#5AB9EA]" : "text-gray-500 hover:text-[#5AB9EA]"
            }`}
          >
            <HelpCircle className="h-5 w-5" />
            <span className="text-xs">Ayuda</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
