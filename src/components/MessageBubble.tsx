
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble = ({ message }: MessageBubbleProps) => {
  const isUser = message.type === 'user';

  return (
    <div className={cn(
      "flex gap-3 animate-in slide-in-from-bottom-2 duration-300",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {/* Avatar */}
      <div className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
        isUser 
          ? "bg-gray-600 text-white" 
          : "bg-blue-600 text-white"
      )}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>

      {/* Message Content */}
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-3 shadow-sm",
        isUser
          ? "bg-gray-600 text-white rounded-br-sm"
          : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
      )}>
        <div className="whitespace-pre-wrap text-sm leading-relaxed">
          {message.content}
        </div>
        <div className={cn(
          "text-xs mt-2 opacity-70",
          isUser ? "text-gray-200" : "text-gray-500"
        )}>
          {message.timestamp.toLocaleTimeString('tr-TR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
