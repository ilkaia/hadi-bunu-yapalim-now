
# YouTube Chat Widget - GitHub Pages Entegrasyonu

Bu widget artık GitHub Pages üzerinde yayınlanmaktadır ve ana sitenize kolayca entegre edilebilir.

## 1. Otomatik Entegrasyon (Önerilen)

Ana sitenizin HTML'ine şu kodu ekleyin:

```html
<!-- YouTube Chat Widget -->
<script>
  (function() {
    var iframe = document.createElement('iframe');
    iframe.src = 'https://ilkaia.github.io/youtube-indirme/';
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
    
    // Mobile responsive
    if (window.innerWidth < 768) {
      iframe.style.width = 'calc(100vw - 20px)';
      iframe.style.height = 'calc(100vh - 40px)';
      iframe.style.top = '20px';
      iframe.style.left = '10px';
    }
    
    document.body.appendChild(iframe);
  })();
</script>
```

## 2. WordPress Entegrasyonu

WordPress sitenizde `Appearance > Theme Editor > footer.php` dosyasına `</body>` etiketinden önce yukarıdaki kodu ekleyin.

## 3. React/Next.js Entegrasyonu

```jsx
import { useEffect } from 'react';

export default function ChatWidget() {
  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://ilkaia.github.io/youtube-indirme/';
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
    `;
    
    document.body.appendChild(iframe);
    
    return () => {
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };
  }, []);

  return null;
}
```

## 4. Özelleştirme Seçenekleri

Widget pozisyonunu değiştirmek için CSS'deki `bottom`, `right` değerlerini değiştirin:

- Sol alt köşe: `bottom: 20px; left: 20px;`
- Sağ üst köşe: `top: 20px; right: 20px;`
- Sol üst köşe: `top: 20px; left: 20px;`

## 5. Custom Domain (Opsiyonel)

Daha profesyonel görünüm için subdomain kurabilirsiniz:

1. DNS ayarlarınızda CNAME kaydı ekleyin:
   ```
   chat.youtube-indirme.com.tr -> ilkaia.github.io
   ```

2. GitHub repository ayarlarından Pages > Custom domain bölümüne `chat.youtube-indirme.com.tr` ekleyin.

3. Widget URL'sini güncelleyin:
   ```javascript
   iframe.src = 'https://chat.youtube-indirme.com.tr/';
   ```

## Deployment Durumu

✅ GitHub Actions otomatik deployment kuruldu
✅ Her push'ta otomatik build ve deploy
✅ Production-ready konfigürasyon
✅ Mobile responsive tasarım
✅ Cross-origin güvenlik ayarları

Widget şu adreste yayında: https://ilkaia.github.io/youtube-indirme/
