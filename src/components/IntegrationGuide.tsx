
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const IntegrationGuide = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const codeSnippets = [
    {
      title: "1. React Component Method (Recommended)",
      description: "Create this component in your real website",
      code: `import { useEffect } from 'react';

const YouTubeAIWidget = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://ilkaia.github.io/hadi-bunu-yapalim-now/widget-embed.js';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      if ((window as any).YouTubeAIWidget) {
        (window as any).YouTubeAIWidget.remove();
      }
    };
  }, []);

  return null;
};

export default YouTubeAIWidget;`
    },
    {
      title: "2. App.tsx Integration",
      description: "Add this to your main App component",
      code: `import YouTubeAIWidget from './components/YouTubeAIWidget';

function App() {
  return (
    <div className="App">
      {/* Your existing site content */}
      
      {/* Add widget at the bottom */}
      <YouTubeAIWidget />
    </div>
  );
}`
    },
    {
      title: "3. Direct HTML Integration",
      description: "Add this script tag before closing </body>",
      code: `<script src="https://ilkaia.github.io/hadi-bunu-yapalim-now/widget-embed.js"></script>`
    }
  ];

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">YouTube AI Widget Integration</h1>
        <p className="text-gray-600">Your widget is ready! Here's how to integrate it into your real website.</p>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-green-800 mb-2">✅ Widget Status: Ready for Integration</h3>
        <p className="text-green-700 text-sm">
          Widget URL: <code className="bg-green-100 px-2 py-1 rounded">https://ilkaia.github.io/hadi-bunu-yapalim-now/</code>
        </p>
      </div>

      {codeSnippets.map((snippet, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              {snippet.title}
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(snippet.code, index)}
                className="ml-2"
              >
                {copiedIndex === index ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">{snippet.description}</p>
            <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{snippet.code}</code>
            </pre>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardHeader>
          <CardTitle>Next Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Copy the React component code above</li>
            <li>Create <code className="bg-gray-100 px-2 py-1 rounded">src/components/YouTubeAIWidget.tsx</code> in your real website</li>
            <li>Import and use it in your main App component</li>
            <li>Build and deploy your website</li>
            <li>Test the widget functionality</li>
          </ol>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-800 mb-2">💡 Pro Tips</h3>
        <ul className="text-blue-700 text-sm space-y-1">
          <li>• Widget will appear in bottom-right corner automatically</li>
          <li>• Fully responsive for mobile devices</li>
          <li>• Uses z-index 9999 to stay on top</li>
          <li>• Clean up function prevents memory leaks</li>
        </ul>
      </div>
    </div>
  );
};

export default IntegrationGuide;
