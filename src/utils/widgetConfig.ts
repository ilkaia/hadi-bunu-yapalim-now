
export interface WidgetConfig {
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme: 'light' | 'dark' | 'auto';
  brandColor: string;
  apiKey?: string;
  welcomeMessage: string;
  minimized: boolean;
  showBranding: boolean;
  notifications: {
    sound: boolean;
    desktop: boolean;
  };
}

export const defaultWidgetConfig: WidgetConfig = {
  position: 'bottom-right',
  theme: 'light',
  brandColor: '#2563eb',
  welcomeMessage: 'Merhaba! YouTube video indirme konusunda size nasıl yardımcı olabilirim?',
  minimized: true,
  showBranding: true,
  notifications: {
    sound: false,
    desktop: false
  }
};

// Widget entegrasyon için kolay kullanım fonksiyonu
export const initChatWidget = (config: Partial<WidgetConfig> = {}) => {
  return {
    ...defaultWidgetConfig,
    ...config
  };
};

// NPM paketi için export edilecek main fonksiyon
export const createYouTubeAIWidget = (containerId: string, config: Partial<WidgetConfig> = {}) => {
  const finalConfig = initChatWidget(config);
  
  // Widget'ı belirtilen container'a mount etme kodu
  console.log('YouTube AI Widget initialized with config:', finalConfig);
  
  return {
    config: finalConfig,
    destroy: () => {
      console.log('Widget destroyed');
    },
    show: () => {
      console.log('Widget shown');
    },
    hide: () => {
      console.log('Widget hidden');
    }
  };
};
