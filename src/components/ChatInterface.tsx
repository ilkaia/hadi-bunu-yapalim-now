
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Send, Bot, AlertCircle, Wifi, WifiOff, X, Minimize2 } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { getAIResponse, resetConversation } from "@/utils/aiResponses";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  isWidget?: boolean;
  onNewMessage?: () => void;
  onClose?: () => void;
}

const ChatInterface = ({ isWidget = false, onNewMessage, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: isWidget 
        ? 'Merhaba! YouTube video indirme konusunda size nasıl yardımcı olabilirim?' 
        : 'Merhaba! Ben YouTube video indirme konusunda size yardımcı olacak AI asistanınızım. OpenAI GPT-4 ile güçlendirilmiş gelişmiş yanıtlar sunuyorum. Video indirme, format dönüştürme, kalite seçimi ve teknik sorularınız için buradayım. Size nasıl yardımcı olabilirim?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Notify parent component about new message (for widget mode)
      if (isWidget && onNewMessage) {
        onNewMessage();
      }
    } catch (error) {
      console.error('Chat Error:', error);
      if (!isWidget) {
        toast({
          title: "Bağlantı Hatası",
          description: "AI yanıtı alınırken hata oluştu. Lütfen tekrar deneyin.",
          variant: "destructive"
        });
      }

      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'ai',
        content: "🛠️ **Bağlantı Hatası**\n\nYanıt alırken bir sorun oluştu. Lütfen:\n• İnternet bağlantınızı kontrol edin\n• Tekrar deneyin\n• Sorun devam ederse sayfayı yenileyin",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      type: 'ai',
      content: 'Sohbet temizlendi! Size nasıl yardımcı olabilirim?',
      timestamp: new Date()
    }]);
    resetConversation();
  };

  return (
    <Card className={cn(
      "flex flex-col shadow-xl border-0 bg-white/80 backdrop-blur-sm",
      isWidget ? "h-full" : "h-[600px]"
    )}>
      {/* Chat Header */}
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

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!isOnline && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2 text-yellow-800">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">İnternet bağlantısı yok. Sınırlı yanıtlar verilecek.</span>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t bg-gray-50/50">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={isWidget ? "Soru sorun..." : "YouTube video indirme hakkında soru sorun..."}
            className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {!isWidget && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            OpenAI GPT-4 ile güçlendirilmiş • YouTube indirme uzmanı
          </p>
        )}
      </div>
    </Card>
  );
};

export default ChatInterface;
