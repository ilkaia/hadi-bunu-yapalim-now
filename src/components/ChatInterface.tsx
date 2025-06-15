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
import ChatHeader from "./chat/ChatHeader";
import ChatMessagesList from "./chat/ChatMessagesList";
import ChatInput from "./chat/ChatInput";

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
        : 'Merhaba! Ben YouTube video indirme konusunda size yardımcı olacak AI asistanım. OpenAI GPT-4 ile güçlendirilmiş gelişmiş yanıtlar sunuyorum. Video indirme, format dönüştürme, kalite seçimi ve teknik sorularınız için buradayım. Size nasıl yardımcı olabilirim?',
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
      "flex flex-col shadow-xl border-0 bg-white/80 backdrop-bl-sm",
      isWidget ? "h-full" : "h-[600px]"
    )}>
      {/* Chat Header */}
      <ChatHeader
        isWidget={isWidget}
        isOnline={isOnline}
        clearChat={clearChat}
        onClose={onClose}
      />

      {/* Messages Area */}
      <ChatMessagesList
        messages={messages}
        isOnline={isOnline}
        isTyping={isTyping}
        messagesEndRef={messagesEndRef}
      />

      {/* Input Area */}
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        handleKeyPress={handleKeyPress}
        handleSendMessage={handleSendMessage}
        isTyping={isTyping}
        isWidget={isWidget}
      />
      {!isWidget && (
        <p className="text-xs text-gray-500 mt-2 text-center pb-2">
          OpenAI GPT-4 ile güçlendirilmiş • YouTube indirme uzmanı
        </p>
      )}
    </Card>
  );
};

export default ChatInterface;
