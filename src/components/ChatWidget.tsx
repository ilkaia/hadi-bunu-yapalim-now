
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ChatInterface from "./ChatInterface";
import WidgetToggle from "./WidgetToggle";

interface ChatWidgetProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark' | 'auto';
  brandColor?: string;
  apiKey?: string;
  welcomeMessage?: string;
  minimized?: boolean;
}

const ChatWidget = ({ 
  position = 'bottom-right',
  theme = 'light',
  brandColor = '#2563eb',
  minimized = true
}: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(!minimized);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Position classes mapping
  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6', 
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
  };

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0); // Clear unread count when opening
    }
  };

  // Handle new messages for unread count
  const handleNewMessage = () => {
    if (!isOpen) {
      setUnreadCount(prev => prev + 1);
    }
  };

  return (
    <div 
      className="chat-widget"
      style={{ 
        '--brand-color': brandColor 
      } as React.CSSProperties}
    >
      {/* Toggle Button */}
      <WidgetToggle 
        isOpen={isOpen}
        onClick={toggleWidget}
        unreadCount={unreadCount}
      />

      {/* Chat Widget Container */}
      {isOpen && (
        <div 
          className={cn(
            "fixed z-40 transition-all duration-300 ease-in-out",
            isMobile 
              ? "inset-4 top-4" // Mobile: Full screen with margin
              : cn(
                  "w-96 h-[600px]", // Desktop: Fixed size
                  positionClasses[position]
                ),
            "animate-in slide-in-from-bottom-4 fade-in-0"
          )}
        >
          {/* Backdrop for mobile */}
          {isMobile && (
            <div 
              className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-lg"
              onClick={() => setIsOpen(false)}
            />
          )}
          
          {/* Chat Interface */}
          <div className="relative z-10 h-full">
            <ChatInterface 
              isWidget={true}
              onNewMessage={handleNewMessage}
              onClose={() => setIsOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
