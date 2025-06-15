
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WidgetToggleProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
}

// Sadece widget kapalıyken toggle gözüksün
const WidgetToggle = ({ isOpen, onClick, unreadCount = 0 }: WidgetToggleProps) => {
  // Widget açıkken tamamen gizle
  if (isOpen) return null;
  
  return (
    <div className="relative">
      <Button
        onClick={onClick}
        className={cn(
          "w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          "bg-blue-600 hover:bg-blue-700 text-white border-2 border-white",
          "fixed bottom-6 right-6 z-[9999]"
        )}
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
      {/* Unread Messages Badge */}
      {unreadCount > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse z-[10000]">
          {unreadCount > 9 ? '9+' : unreadCount}
        </div>
      )}
      {/* Pulse Animation for New Messages */}
      {unreadCount > 0 && (
        <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-75 z-[9998]"></div>
      )}
    </div>
  );
};

export default WidgetToggle;
