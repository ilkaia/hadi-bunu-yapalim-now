import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">YouTube İndirme AI Asistan</h2>
            <p className="text-gray-600">YouTube videolarınızı güvenli bir şekilde indirin.</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <ChatInterface isWidget={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
