
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import React from "react";

interface ChatInputProps {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  handleKeyPress: (e: React.KeyboardEvent) => void;
  handleSendMessage: () => void;
  isTyping: boolean;
  isWidget: boolean;
}

const ChatInput = ({
  inputValue,
  setInputValue,
  handleKeyPress,
  handleSendMessage,
  isTyping,
  isWidget,
}: ChatInputProps) => (
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
  </div>
);

export default ChatInput;
