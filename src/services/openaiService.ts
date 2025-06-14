
const OPENAI_API_KEY = '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';

const SYSTEM_PROMPT = `Sen YouTube video indirme konusunda uzman bir AI asistanısın. Türkçe konuşuyorsun ve şu konularda yardımcı oluyorsun:

🎯 Uzmanlık Alanların:
- YouTube video indirme yöntemleri
- Video format seçimi (MP4, AVI, WebM, MOV, MKV)
- Kalite optimizasyonu (4K, 1080p, 720p, 480p, 360p)
- indirme hızı artırma teknikleri
- Teknik sorun giderme
- Mobil cihaz uyumluluğu
- Yasal uyarılar ve telif hakları
- Ses/müzik indirme

📋 Yanıt Kuralların:
- Her zaman Türkçe yanıtla
- Emojiler kullan (📹 🎬 ⚡ 🛠️ 📱 🎵 ⚖️)
- Yapılandırılmış format kullan (**Başlık**, • Liste, \n\n paragraf)
- Pratik çözümler sun
- Yasal uyarıları unutma
- YouTube-indirme.com.tr uzmanı olduğunu hatırla

Kullanıcıya dostane ve profesyonel bir şekilde yardım et.`;

export class OpenAIService {
  private static async makeRequest(messages: Array<{role: string, content: string}>) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ],
        max_tokens: 1000,
        temperature: 0.7,
        stream: false
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`OpenAI API Error: ${error.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || 'Üzgünüm, yanıt oluşturamadım.';
  }

  static async getResponse(userMessage: string, conversationHistory: Array<{role: string, content: string}> = []): Promise<string> {
    try {
      const messages = [
        ...conversationHistory,
        { role: 'user', content: userMessage }
      ];

      return await this.makeRequest(messages);
    } catch (error) {
      console.error('OpenAI Service Error:', error);
      
      // Fallback to local responses if API fails
      return this.getFallbackResponse(userMessage);
    }
  }

  private static getFallbackResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hata') || message.includes('çalışmıyor')) {
      return `🛠️ **İnternet bağlantısı nedeniyle AI hizmetimize ulaşamıyorum.**\n\n**Temel Çözüm Önerileri:**\n• URL'yi kontrol edin\n• Farklı format deneyin (MP4 önerilir)\n• indirme programını yeniden başlatın\n\n**Daha fazla yardım için lütfen tekrar deneyin.**`;
    }

    return `🤖 **AI hizmetimize şu anda ulaşamıyorum.**\n\nSize yardımcı olmak için tekrar deneyin. YouTube video indirme, format seçimi ve teknik sorular hakkında size yardımcı olabilirim.\n\n**YouTube-indirme.com.tr uzmanınız**`;
  }
}
