
(function() {
  // YouTube AI Chat Widget - Embed Script
  'use strict';
  
  // Widget'ın zaten yüklü olup olmadığını kontrol et
  if (window.YouTubeAIWidget) {
    console.warn('YouTube AI Widget already loaded');
    return;
  }
  
  // Widget konfigürasyonu
  const config = {
    position: 'bottom-right',
    theme: 'light',
    brandColor: '#2563eb',
    minimized: true,
    responsive: true,
    widgetUrl: 'https://ilkaia.github.io/hadi-bunu-yapalim-now/'
  };
  
  // Widget container'ını oluştur
  function createWidget() {
    const iframe = document.createElement('iframe');
    iframe.id = 'youtube-ai-widget';
    iframe.src = config.widgetUrl;
    iframe.frameBorder = '0';
    iframe.scrolling = 'no';
    iframe.allow = 'microphone; camera';
    
    // Widget stilleri
    const styles = {
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: '400px',
      height: '600px',
      border: 'none',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
      zIndex: '9999',
      background: 'white',
      transition: 'all 0.3s ease',
      display: 'block'
    };
    
    // Stilleri uygula
    Object.assign(iframe.style, styles);
    
    // Mobile responsive ayarları
    function handleResize() {
      if (window.innerWidth < 768) {
        Object.assign(iframe.style, {
          width: 'calc(100vw - 20px)',
          height: 'calc(100vh - 40px)',
          top: '20px',
          left: '10px',
          right: 'auto',
          bottom: 'auto'
        });
      } else {
        Object.assign(iframe.style, {
          width: '400px',
          height: '600px',
          top: 'auto',
          left: 'auto',
          right: '20px',
          bottom: '20px'
        });
      }
    }
    
    // Resize event listener
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Widget'ı sayfaya ekle
    document.body.appendChild(iframe);
    
    // Global widget objesi
    window.YouTubeAIWidget = {
      iframe: iframe,
      config: config,
      show: function() {
        iframe.style.display = 'block';
      },
      hide: function() {
        iframe.style.display = 'none';
      },
      remove: function() {
        window.removeEventListener('resize', handleResize);
        if (iframe.parentNode) {
          iframe.parentNode.removeChild(iframe);
        }
        delete window.YouTubeAIWidget;
      }
    };
    
    console.log('YouTube AI Widget loaded successfully');
    return iframe;
  }
  
  // DOM hazır olduğunda widget'ı yükle
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
