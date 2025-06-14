
// Widget embedding script for external websites
interface WidgetConfig {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: 'light' | 'dark';
  brandColor?: string;
  widgetUrl?: string;
}

declare global {
  interface Window {
    YoutubeChatWidget: {
      init: (config?: WidgetConfig) => void;
      destroy: () => void;
    };
  }
}

class YoutubeChatWidget {
  private iframe: HTMLIFrameElement | null = null;
  private config: WidgetConfig;

  constructor(config: WidgetConfig = {}) {
    this.config = {
      position: 'bottom-right',
      theme: 'light',
      brandColor: '#2563eb',
      widgetUrl: 'https://ilkaia.github.io/youtube-indirme/',
      ...config
    };
  }

  init() {
    if (this.iframe) {
      this.destroy();
    }

    this.iframe = document.createElement('iframe');
    this.iframe.src = this.config.widgetUrl!;
    this.iframe.style.cssText = `
      position: fixed;
      ${this.getPositionStyles()}
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
      this.iframe.style.cssText += `
        width: calc(100vw - 20px);
        height: calc(100vh - 40px);
        top: 20px;
        left: 10px;
        right: 10px;
        bottom: 20px;
      `;
    }

    document.body.appendChild(this.iframe);

    // Handle resize
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  private getPositionStyles(): string {
    switch (this.config.position) {
      case 'bottom-left':
        return 'bottom: 20px; left: 20px;';
      case 'top-right':
        return 'top: 20px; right: 20px;';
      case 'top-left':
        return 'top: 20px; left: 20px;';
      default:
        return 'bottom: 20px; right: 20px;';
    }
  }

  private handleResize() {
    if (!this.iframe) return;

    if (window.innerWidth < 768) {
      this.iframe.style.width = 'calc(100vw - 20px)';
      this.iframe.style.height = 'calc(100vh - 40px)';
      this.iframe.style.top = '20px';
      this.iframe.style.left = '10px';
      this.iframe.style.right = '10px';
      this.iframe.style.bottom = '20px';
    } else {
      this.iframe.style.width = '400px';
      this.iframe.style.height = '600px';
      this.iframe.style.cssText += this.getPositionStyles();
    }
  }

  destroy() {
    if (this.iframe) {
      document.body.removeChild(this.iframe);
      this.iframe = null;
    }
    window.removeEventListener('resize', this.handleResize.bind(this));
  }
}

// Global API
window.YoutubeChatWidget = {
  init: (config?: WidgetConfig) => {
    const widget = new YoutubeChatWidget(config);
    widget.init();
  },
  destroy: () => {
    // Implementation for destroying widget
  }
};

export default YoutubeChatWidget;
