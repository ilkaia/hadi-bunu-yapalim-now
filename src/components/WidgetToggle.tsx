import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WidgetToggleProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
}

const WidgetToggle = ({ isOpen, onClick, unreadCount = 0 }: WidgetToggleProps) => {
  if (isOpen) return null;
  
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-center">
      {/* Asistana sor yazısı */}
      <div className="mb-2 bg-gray-800 text-white px-3 py-1 rounded-lg shadow-lg text-sm font-medium">
        Asistana sor
      </div>
      
      {/* Mavi buton */}
      <div className="relative">
        <Button
          onClick={onClick}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
            "bg-blue-600 hover:bg-blue-700 text-white border-2 border-white"
          )}
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        
        {unreadCount > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </div>
        )}
      </div>
    </div>
  );
};

export default WidgetToggle;
