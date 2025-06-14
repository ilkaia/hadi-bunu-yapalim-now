
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            YouTube İndirme AI Asistan
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Video indirme, format dönüştürme ve teknik sorularınız için uzman asistanınız
          </p>
          <div className="mt-4 text-sm text-blue-600">
            YouTube-indirme.com.tr
          </div>
          
          {/* Demo Content */}
          <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-lg p-8 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Widget Demo</h2>
            <p className="text-gray-600 mb-4">
              Sağ alt köşedeki chat widget'ına tıklayarak AI asistanımızla konuşmaya başlayın.
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h3 className="font-semibold mb-2">✨ Widget Özellikleri</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Floating tasarım</li>
                  <li>• Responsive (mobil uyumlu)</li>
                  <li>• Bildirim sistemi</li>
                  <li>• Minimize/maximize</li>
                  <li>• Kolay entegrasyon</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">🤖 AI Yetenekleri</h3>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• OpenAI GPT-4</li>
                  <li>• YouTube uzmanı</li>
                  <li>• Format önerileri</li>
                  <li>• Teknik destek</li>
                  <li>• Türkçe dil desteği</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatWidget 
        position="bottom-right"
        theme="light"
        brandColor="#2563eb"
        minimized={true}
      />
    </div>
  );
};

export default Index;
