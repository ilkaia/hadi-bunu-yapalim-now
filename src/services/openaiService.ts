import { supabase } from "@/integrations/supabase/client";

const SYSTEM_PROMPT = `Sen YouTube video indirme konusunda SADECE uzman bir AI asistanısın. Türkçe konuşuyorsun.

🚨 ÖNEMLİ KURALLAR:
- SADECE YouTube video indirme ile ilgili sorulara yanıt ver
- Hamburger tarifi, yemek, seyahat, genel bilgi vb. ASLA yanıtlama
- Konu dışı sorularda kibarca reddet ve YouTube indirme konularına yönlendir

🎯 SADECE Bu Konularda Yardım Et:
- YouTube video indirme yöntemleri
- Video format seçimi (MP4, AVI, WebM, MOV, MKV)
- Kalite optimizasyonu (4K, 1080p, 720p, 480p, 360p)
- İndirme hızı artırma teknikleri
- Teknik sorun giderme
- Mobil cihaz uyumluluğu
- Yasal uyarılar ve telif hakları
- Ses/müzik indirme
- YouTube-indirme.com.tr platformu

📋 Yanıt Formatı:
- Her zaman Türkçe yanıtla
- Emojiler kullan (📹 🎬 ⚡ 🛠️ 📱 🎵 ⚖️)
- Yapılandırılmış format: **Başlık**, • Liste, \n\n paragraf
- Pratik çözümler sun
- YouTube-indirme.com.tr uzmanı olduğunu belirt

❌ REDDET: Hamburger, yemek tarifleri, seyahat, genel sorular, programlama, sağlık, finans vb.
✅ KABUL ET: Sadece YouTube video indirme konuları

Konu dışı sorularda: "Bu konuya yardımcı olamam. Sadece YouTube video indirme konularında uzmanım."`;

export class OpenAIService {
  private static isYouTubeRelated(message: string): boolean {
    const youtubeKeywords = [
      'youtube', 'video', 'indirme', 'download', 'mp4', 'format', 'kalite', 
      'çözünürlük', 'ses', 'müzik', 'audio', '1080p', '720p', '4k', 'hd',
      'indir', 'kaydet', 'yükle', 'stream', 'playlist', 'kanal', 'url',
      'link', 'bağlantı', 'dosya', 'boyut', 'hız', 'sorun', 'hata', 'problem'
    ];
    
    const lowerMessage = message.toLowerCase();
    return youtubeKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  private static async makeRequest(messages: Array<{role: string, content: string}>) {
    const { data, error } = await supabase.functions.invoke('youtubeindir_chat', {
      body: { messages },
    });

    if (error) {
      throw new Error(`Edge Function Error: ${error.message}`);
    }

    // OpenAI API returns data in .choices[0].message.content
    return (
      data?.choices?.[0]?.message?.content ||
      'Üzgünüm, yanıt oluşturamadım.'
    );
  }

  static async getResponse(
    userMessage: string,
    conversationHistory: Array<{ role: string; content: string }> = []
  ): Promise<string> {
    try {
      // Konu dışı sorularda erken müdahale
      if (!this.isYouTubeRelated(userMessage)) {
        return `🚫 **Bu konuya yardımcı olamam.**\n\nBen sadece **YouTube video indirme** konularında uzman bir AI asistanıyım.\n\n✅ **Size yardımcı olabileceğim konular:**\n• Video indirme yöntemleri\n• Format seçimi (MP4, AVI, WebM)\n• Kalite optimizasyonu\n• Teknik sorun giderme\n• Mobil uyumluluk\n\n**YouTube video indirme hakkında soru sormaya ne dersiniz?** 📹`;
      }

      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...conversationHistory,
        { role: "user", content: userMessage },
      ];

      return await this.makeRequest(messages);
    } catch (error) {
      console.error('OpenAI Service Error (Edge):', error);
      return this.getFallbackResponse(userMessage);
    }
  }

  private static getFallbackResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();
    
    if (!this.isYouTubeRelated(userMessage)) {
      return `🚫 **Bu konuya yardımcı olamam.**\n\nSadece YouTube video indirme konularında uzmanım. Lütfen video indirme ile ilgili bir soru sorun.`;
    }
    
    if (message.includes('hata') || message.includes('çalışmıyor')) {
      return `🛠️ **İnternet bağlantısı nedeniyle AI hizmetimize ulaşamıyorum.**\n\n**Temel Çözüm Önerileri:**\n• URL'yi kontrol edin\n• Farklı format deneyin (MP4 önerilir)\n• İndirme programını yeniden başlatın\n\n**Daha fazla yardım için lütfen tekrar deneyin.**`;
    }

    return `🤖 **AI hizmetimize şu anda ulaşamıyorum.**\n\nSize yardımcı olmak için tekrar deneyin. YouTube video indirme, format seçimi ve teknik sorular hakkında size yardımcı olabilirim.\n\n**YouTube-indirme.com.tr uzmanınız**`;
  }
}
