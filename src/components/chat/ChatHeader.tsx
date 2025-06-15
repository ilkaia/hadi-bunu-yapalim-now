
import { Button } from "@/components/ui/button";
import { Bot, Wifi, WifiOff, Minimize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  isWidget: boolean;
  isOnline: boolean;
  clearChat: () => void;
  onClose?: () => void;
}

const ChatHeader = ({ isWidget, isOnline, clearChat, onClose }: ChatHeaderProps) => (
  <div className="p-4 border-b bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <Bot className="w-6 h-6" />
        </div>
        <div>
          <h3 className={cn("font-semibold", isWidget ? "text-sm" : "text-base")}>
            AI Video Asistan
          </h3>
          <div className="flex items-center gap-2 text-xs opacity-90">
            {isOnline ? (
              <>
                <Wifi className="w-3 h-3" />
                <span>GPT-4 Aktif</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3" />
                <span>Çevrimdışı</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!isWidget && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearChat}
            className="text-white hover:bg-white/20"
          >
            Temizle
          </Button>
        )}
        {isWidget && onClose && (
          <>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearChat}
              className="text-white hover:bg-white/20 p-2"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2"
            >
              <X className="w-4 h-4" />
            </Button>
          </>
        )}
      </div>
    </div>
  </div>
);

export default ChatHeader;
