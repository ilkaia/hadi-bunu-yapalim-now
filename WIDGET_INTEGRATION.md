
# YouTube AI Chat Widget - Web Sitesi Entegrasyonu

Bu widget'ı herhangi bir web sitesine kolayca entegre edebilirsiniz.

## 1. Basit HTML Entegrasyonu (Önerilen)

Web sitenizin HTML dosyasında `</body>` etiketinden hemen önce şu kodu ekleyin:

```html
<!-- YouTube AI Chat Widget -->
<script src="https://ilkaia.github.io/hadi-bunu-yapalim-now/widget-embed.js"></script>
```

## 2. Manuel JavaScript Entegrasyonu

Eğer daha fazla kontrol istiyorsanız, şu kodu kullanabilirsiniz:

```html
<script>
(function() {
  var script = document.createElement('script');
  script.src = 'https://ilkaia.github.io/hadi-bunu-yapalim-now/widget-embed.js';
  script.async = true;
  document.head.appendChild(script);
})();
</script>
```

## 3. WordPress Entegrasyonu

### Yöntem 1: Tema Dosyalarını Düzenleme
1. WordPress Admin → Görünüm → Tema Düzenleyicisi
2. `footer.php` dosyasını açın
3. `</body>` etiketinden önce widget kodunu ekleyin:

```php
<!-- YouTube AI Chat Widget -->
<script src="https://ilkaia.github.io/hadi-bunu-yapalim-now/widget-embed.js"></script>
<?php wp_footer(); ?>
```

### Yöntem 2: Plugin Kullanımı
1. "Insert Headers and Footers" plugin'ini yükleyin
2. Ayarlar → Insert Headers and Footers
3. Footer Scripts bölümüne widget kodunu ekleyin

## 4. React/Next.js Entegrasyonu

```jsx
import { useEffect } from 'react';

export default function YouTubeAIWidget() {
  useEffect(() => {
    // Widget script'ini yükle
    const script = document.createElement('script');
    script.src = 'https://ilkaia.github.io/hadi-bunu-yapalim-now/widget-embed.js';
    script.async = true;
    document.head.appendChild(script);
    
    // Cleanup
    return () => {
      if (window.YouTubeAIWidget) {
        window.YouTubeAIWidget.remove();
      }
    };
  }, []);

  return null;
}
```

## 5. Vue.js Entegrasyonu

```vue
<template>
  <div></div>
</template>

<script>
export default {
  name: 'YouTubeAIWidget',
  mounted() {
    const script = document.createElement('script');
    script.src = 'https://ilkaia.github.io/hadi-bunu-yapalim-now/widget-embed.js';
    script.async = true;
    document.head.appendChild(script);
  },
  beforeDestroy() {
    if (window.YouTubeAIWidget) {
      window.YouTubeAIWidget.remove();
    }
  }
}
</script>
```

## 6. Google Tag Manager Entegrasyonu

1. GTM dashboard'a girin
2. Yeni Tag oluşturun
3. Tag Type: Custom HTML
4. HTML içeriğine şu kodu ekleyin:

```html
<script src="https://ilkaia.github.io/hadi-bunu-yapalim-now/widget-embed.js"></script>
```

5. Trigger: All Pages
6. Yayınlayın

## 7. Widget Kontrolü (JavaScript API)

Widget yüklendikten sonra JavaScript ile kontrol edebilirsiniz:

```javascript
// Widget'ı göster
if (window.YouTubeAIWidget) {
  window.YouTubeAIWidget.show();
}

// Widget'ı gizle
if (window.YouTubeAIWidget) {
  window.YouTubeAIWidget.hide();
}

// Widget'ı tamamen kaldır
if (window.YouTubeAIWidget) {
  window.YouTubeAIWidget.remove();
}
```

## 8. Özelleştirme Seçenekleri

Widget'ın pozisyonunu değiştirmek için CSS ile override edebilirsiniz:

```css
/* Sol alt köşe */
#youtube-ai-widget {
  left: 20px !important;
  right: auto !important;
}

/* Üst sağ köşe */
#youtube-ai-widget {
  top: 20px !important;
  bottom: auto !important;
}

/* Farklı boyut */
#youtube-ai-widget {
  width: 350px !important;
  height: 500px !important;
}
```

## 9. Mobil Optimizasyon

Widget otomatik olarak mobil cihazlarda tam ekran moduna geçer. Bu davranışı değiştirmek için:

```css
@media (max-width: 768px) {
  #youtube-ai-widget {
    width: 300px !important;
    height: 400px !important;
    top: auto !important;
    left: auto !important;
    right: 10px !important;
    bottom: 10px !important;
  }
}
```

## 10. Test ve Doğrulama

Widget'ın doğru çalıştığını kontrol edin:

1. ✅ Sağ alt köşede chat butonu görünüyor mu?
2. ✅ Butona tıkladığınızda widget açılıyor mu?
3. ✅ Mobilde responsive çalışıyor mu?
4. ✅ Konsol'da hata var mı?
5. ✅ Diğer site öğeleriyle çakışma var mı?

## Sorun Giderme

### Widget görünmüyor
- Konsol'da hata mesajları kontrol edin
- Widget URL'sinin erişilebilir olduğunu doğrulayın
- Z-index çakışması olup olmadığını kontrol edin

### Mobile'da düzgün görünmüyor
- Viewport meta tag'inin olduğundan emin olun:
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Widget yavaş yükleniyor
- Script'i `async` attribute ile yüklediğinizden emin olun
- CDN kullanımını tercih edin

## Destek

Entegrasyon sırasında sorun yaşarsanız:
1. Browser console'unu kontrol edin
2. Widget URL'sinin çalıştığını doğrulayın: https://ilkaia.github.io/hadi-bunu-yapalim-now/
3. CSS çakışması olmadığından emin olun

**Widget URL:** https://ilkaia.github.io/hadi-bunu-yapalim-now/
**Script URL:** https://ilkaia.github.io/hadi-bunu-yapalim-now/widget-embed.js
