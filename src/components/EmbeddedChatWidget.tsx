
import { useEffect } from 'react';

const EmbeddedChatWidget = () => {
  useEffect(() => {
    // Widget iframe'ini oluştur
    const iframe = document.createElement('iframe');
    iframe.src = 'https://ilkaia.github.io/hadi-bunu-yapalim-now/';
    iframe.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 400px;
      height: 600px;
      border: none;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      z-index: 9999;
      background: white;
      transition: all 0.3s ease;
    `;
    
    // Mobile responsive ayarları
    const handleResize = () => {
      if (window.innerWidth < 768) {
        iframe.style.width = 'calc(100vw - 20px)';
        iframe.style.height = 'calc(100vh - 40px)';
        iframe.style.top = '20px';
        iframe.style.left = '10px';
        iframe.style.right = 'auto';
        iframe.style.bottom = 'auto';
      } else {
        iframe.style.width = '400px';
        iframe.style.height = '600px';
        iframe.style.top = 'auto';
        iframe.style.left = 'auto';
        iframe.style.right = '20px';
        iframe.style.bottom = '20px';
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // iframe'i sayfaya ekle
    document.body.appendChild(iframe);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };
  }, []);

  return null; // Bu component görsel bir şey render etmez
};

export default EmbeddedChatWidget;
