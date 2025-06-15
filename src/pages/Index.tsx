
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IntegrationGuide from "@/components/IntegrationGuide";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <Tabs defaultValue="integration" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="integration">Integration Guide</TabsTrigger>
            <TabsTrigger value="preview">Widget Preview</TabsTrigger>
          </TabsList>
          
          <TabsContent value="integration" className="mt-6">
            <IntegrationGuide />
          </TabsContent>
          
          <TabsContent value="preview" className="mt-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold mb-2">Widget Preview</h2>
                <p className="text-gray-600">This is how your widget will look and behave on your website.</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-6">
                <ChatInterface isWidget={false} />
              </div>
              
              <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800 text-sm">
                  <strong>Note:</strong> The actual widget will appear as a floating chat button in the bottom-right corner of your website. 
                  The above is just a preview of the chat interface.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
