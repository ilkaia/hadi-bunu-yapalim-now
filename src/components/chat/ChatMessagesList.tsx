
import { AlertCircle } from "lucide-react";
import MessageBubble from "../MessageBubble";
import TypingIndicator from "../TypingIndicator";
import React from "react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}
interface ChatMessagesListProps {
  messages: Message[];
  isOnline: boolean;
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatMessagesList = ({
  messages,
  isOnline,
  isTyping,
  messagesEndRef,
}: ChatMessagesListProps) => (
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
);

export default ChatMessagesList;
