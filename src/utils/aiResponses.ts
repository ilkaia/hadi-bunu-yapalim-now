
const videoFormats = {
  "mp4": "En yaygın video formatı, tüm cihazlarda çalışır",
  "webm": "Web için optimize edilmiş, küçük dosya boyutu",
  "avi": "Yüksek kalite, büyük dosya boyutu",
  "mov": "Apple cihazları için ideal",
  "mkv": "Yüksek kalite, çoklu ses/altyazı desteği"
};

const qualityOptions = {
  "4k": "3840x2160 - Ultra yüksek çözünürlük",
  "1440p": "2560x1440 - QHD kalite",
  "1080p": "1920x1080 - Full HD kalite", 
  "720p": "1280x720 - HD kalite",
  "480p": "854x480 - Standart kalite",
  "360p": "640x360 - Düşük kalite, hızlı indirme"
};

const commonIssues = {
  "yavas": "Video indirme hızını artırmak için:\n• İnternet bağlantınızı kontrol edin\n• Daha düşük kalite seçin\n• İndirme programınızı güncelleyin\n• VPN kullanıyorsanız kapatın",
  "hata": "İndirme hataları için:\n• URL'yi kontrol edin\n• Video gizli/kısıtlı olabilir\n• Farklı format deneyin\n• İndirme programını yeniden başlatın",
  "format": "Format dönüştürme için:\n• FFmpeg gibi araçlar kullanın\n• Online dönüştürücüler deneyin\n• VLC media player ile dönüştürün",
  "kalite": "En iyi kalite için:\n• Mevcut en yüksek çözünürlüğü seçin\n• MP4 formatını tercih edin\n• Orijinal ses kalitesini koruyun"
};

export const getAIResponse = async (userMessage: string): Promise<string> => {
  const message = userMessage.toLowerCase();
  
  // Format soruları
  if (message.includes("format") || message.includes("mp4") || message.includes("avi")) {
    const formatList = Object.entries(videoFormats)
      .map(([format, desc]) => `• ${format.toUpperCase()}: ${desc}`)
      .join("\n");
    
    return `📹 **Video Formatları Hakkında:**\n\n${formatList}\n\n**Önerim:** Genel kullanım için MP4 formatını tercih edin. Tüm cihazlarda sorunsuz çalışır ve iyi sıkıştırma sunar.`;
  }

  // Kalite soruları
  if (message.includes("kalite") || message.includes("çözünürlük") || message.includes("1080p")) {
    const qualityList = Object.entries(qualityOptions)
      .map(([quality, desc]) => `• ${quality}: ${desc}`)
      .join("\n");
    
    return `🎬 **Video Kalite Seçenekleri:**\n\n${qualityList}\n\n**İpucu:** İnternet hızınıza göre seçim yapın. Hızlı indirme için 720p, en iyi kalite için 1080p ideal.`;
  }

  // Hız sorunları
  if (message.includes("yavaş") || message.includes("hız") || message.includes("uzun sürüyor")) {
    return `⚡ **İndirme Hızını Artırma:**\n\n${commonIssues.yavas}\n\n**Ek İpuçları:**\n• Aynı anda birden fazla indirme yapmayın\n• Tarayıcınızı kapatıp sadece indirme programını çalıştırın\n• Peak saatlerde (akşam) indirme yapmayın`;
  }

  // Hata sorunları  
  if (message.includes("hata") || message.includes("çalışmıyor") || message.includes("indirilmiyor")) {
    return `🛠️ **İndirme Hataları Çözümü:**\n\n${commonIssues.hata}\n\n**Yaygın Hatalar:**\n• "Video bulunamadı" → URL'yi kontrol edin\n• "Bağlantı hatası" → İnternet bağlantısını kontrol edin\n• "Format desteklenmiyor" → Farklı format deneyin`;
  }

  // YouTube özellikleri
  if (message.includes("youtube") || message.includes("playlist") || message.includes("kanal")) {
    return `🎵 **YouTube İndirme Özellikler:**\n\n• **Tek Video:** Direkt URL ile indirin\n• **Playlist:** Tüm listeyi toplu indirme\n• **Kanal:** Kanal videolarını toplu indirme\n• **Altyazı:** CC altyazıları dahil indirme\n• **Sadece Ses:** MP3 formatında müzik indirme\n\n**Not:** Telif hakkı korumalı içeriklere dikkat edin!`;
  }

  // Mobil cihaz soruları
  if (message.includes("mobil") || message.includes("telefon") || message.includes("android") || message.includes("ios")) {
    return `📱 **Mobil Cihazlarda Video İndirme:**\n\n**Android:**\n• TubeMate, VidMate gibi uygulamalar\n• Tarayıcı tabanlı indirme siteleri\n• MP4 formatını tercih edin\n\n**iOS:**\n• Documents by Readdle uygulaması\n• Shortcuts uygulaması ile otomasyon\n• Online indirme siteleri\n\n**Genel İpuçlar:**\n• WiFi bağlantısı kullanın\n• Yeterli depolama alanı bırakın`;
  }

  // Yasal uyarı soruları
  if (message.includes("yasal") || message.includes("telif") || message.includes("hakkı")) {
    return `⚖️ **Yasal Bilgilendirme:**\n\n**İzin Verilen:**\n• Kendi videolarınız\n• Creative Commons lisanslı içerik\n• Kişisel kullanım için adil kullanım\n\n**Yasak Olan:**\n• Telif hakkı korumalı müzik/film\n• Ticari amaçlı kullanım\n• İçeriği yeniden yayınlama\n\n**Önemli:** İndirdiğiniz içeriği sadece kişisel kullanım için saklayın. Yasal sorumluluk size aittir.`;
  }

  // Ses indirme
  if (message.includes("müzik") || message.includes("ses") || message.includes("mp3") || message.includes("audio")) {
    return `🎵 **Ses/Müzik İndirme:**\n\n**Ses Formatları:**\n• MP3: En yaygın, küçük boyut\n• WAV: Yüksek kalite, büyük boyut\n• AAC: iPhone/iTunes uyumlu\n• OGG: Açık kaynak format\n\n**Kalite Seçenekleri:**\n• 320 kbps: En yüksek kalite\n• 256 kbps: Çok iyi kalite\n• 128 kbps: Standart kalite\n\n**İpucu:** Müzik için 256 kbps MP3 formatı idealdir.`;
  }

  // Genel yardım
  if (message.includes("merhaba") || message.includes("selam") || message.includes("yardım")) {
    return `👋 **Merhaba! Size nasıl yardımcı olabilirim?**\n\n🔹 Video format önerileri (MP4, AVI, WebM)\n🔹 Kalite seçimi (4K, 1080p, 720p)\n🔹 İndirme hızı optimizasyonu\n🔹 Hata çözümleri\n🔹 Mobil cihazlarda indirme\n🔹 Ses/müzik indirme\n🔹 Yasal bilgilendirme\n\n**Örnek sorular:**\n• "En iyi video kalitesi hangisi?"\n• "İndirme çok yavaş, ne yapmalıyım?"\n• "Telefonda nasıl video indiririm?"`;
  }

  // Varsayılan yanıt
  return `🤖 **Anladığım kadarıyla video indirme konusunda yardım istiyorsunuz.**\n\nSize şu konularda yardımcı olabilirim:\n\n• 📹 **Format seçimi** (MP4, AVI, WebM)\n• 🎬 **Kalite ayarları** (4K, 1080p, 720p)\n• ⚡ **Hız optimizasyonu**\n• 🛠️ **Hata çözümleri**\n• 📱 **Mobil indirme**\n• 🎵 **Ses indirme**\n\n**Daha spesifik bir soru sorabilir misiniz?** Örneğin:\n"MP4 mı AVI mı daha iyi?" veya "İndirme hızını nasıl artırırım?"`;
};
