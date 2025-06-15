
import { useEffect } from 'react';

// Bu component gerçek sitenizde kullanılmak için hazırlanmıştır
const ExternalIntegration = () => {
  useEffect(() => {
    // Widget script'ini yükle
    const script = document.createElement('script');
    script.src = 'https://ilkaia.github.io/hadi-bunu-yapalim-now/widget-embed.js';
    script.async = true;
    script.onload = () => {
      console.log('YouTube AI Widget script loaded');
    };
    script.onerror = () => {
      console.error('Failed to load YouTube AI Widget script');
    };
    
    document.head.appendChild(script);
    
    // Cleanup fonksiyonu
    return () => {
      if ((window as any).YouTubeAIWidget) {
        (window as any).YouTubeAIWidget.remove();
      }
      
      // Script'i kaldır
      const existingScript = document.querySelector(`script[src="${script.src}"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null; // Bu component hiçbir UI render etmez
};

export default ExternalIntegration;
