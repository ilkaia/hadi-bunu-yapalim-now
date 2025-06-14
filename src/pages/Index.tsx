
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            YouTube İndirme AI Asistan
          </h1>
          <p className="text-lg text-gray-600">
            Video indirme, format dönüştürme ve teknik sorularınız için uzman asistanınız
          </p>
          <div className="mt-4 text-sm text-blue-600">
            YouTube-Indirme.com.tr
          </div>
        </div>
        <ChatInterface />
      </div>
    </div>
  );
};

export default Index;
