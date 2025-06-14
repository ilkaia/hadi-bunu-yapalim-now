
import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 animate-in slide-in-from-bottom-2 duration-300">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-blue-600 text-white">
        <Bot className="w-4 h-4" />
      </div>

      {/* Typing Animation */}
      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-1">
          <div className="text-sm text-gray-600 mr-2">AI yazıyor</div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
