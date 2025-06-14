
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WidgetToggleProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
}

const WidgetToggle = ({ isOpen, onClick, unreadCount = 0 }: WidgetToggleProps) => {
  return (
    <div className="relative">
      <Button
        onClick={onClick}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          "bg-blue-600 hover:bg-blue-700 text-white border-2 border-white",
          "fixed bottom-6 right-6 z-50"
        )}
        size="icon"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </Button>
      
      {/* Unread Messages Badge */}
      {unreadCount > 0 && !isOpen && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
          {unreadCount > 9 ? '9+' : unreadCount}
        </div>
      )}
      
      {/* Pulse Animation for New Messages */}
      {unreadCount > 0 && !isOpen && (
        <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-75"></div>
      )}
    </div>
  );
};

export default WidgetToggle;
