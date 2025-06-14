
import { OpenAIService } from '@/services/openaiService';

// Conversation history to maintain context
let conversationHistory: Array<{role: string, content: string}> = [];

export const getAIResponse = async (userMessage: string): Promise<string> => {
  try {
    // Add user message to history
    conversationHistory.push({ role: 'user', content: userMessage });
    
    // Get AI response
    const response = await OpenAIService.getResponse(userMessage, conversationHistory);
    
    // Add AI response to history
    conversationHistory.push({ role: 'assistant', content: response });
    
    // Keep only last 10 messages to prevent token overflow
    if (conversationHistory.length > 10) {
      conversationHistory = conversationHistory.slice(-10);
    }
    
    return response;
  } catch (error) {
    console.error('AI Response Error:', error);
    return getFallbackResponse(userMessage);
  }
};

// Reset conversation (can be called when starting fresh)
export const resetConversation = () => {
  conversationHistory = [];
};

// Fallback responses for when API is unavailable
const getFallbackResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();
  
  if (message.includes('format') || message.includes('mp4')) {
    return `📹 **Video Formatları (Offline Mode):**\n\n• **MP4**: En yaygın, tüm cihazlarda çalışır\n• **WebM**: Web optimized, küçük boyut\n• **AVI**: Yüksek kalite, büyük dosya\n\n**AI hizmetimiz şu anda kullanılamıyor. Lütfen tekrar deneyin.**`;
  }

  if (message.includes('kalite') || message.includes('1080p')) {
    return `🎬 **Video Kalite Seçenekleri (Offline Mode):**\n\n• **4K**: Ultra yüksek çözünürlük\n• **1080p**: Full HD (önerilir)\n• **720p**: HD kalite\n• **480p**: Standart kalite\n\n**AI hizmetimiz şu anda kullanılamıyor. Lütfen tekrar deneyin.**`;
  }

  return `🤖 **AI Hizmetimiz Geçici Olarak Kullanılamıyor**\n\nİnternet bağlantınızı kontrol edin ve tekrar deneyin. Size YouTube video indirme konusunda yardımcı olmak için buradayım.\n\n**YouTube-indirme.com.tr**`;
};
