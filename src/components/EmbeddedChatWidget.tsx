
import ChatWidget from "./ChatWidget";

const EmbeddedChatWidget = () => {
  return (
    <ChatWidget 
      position="bottom-right"
      theme="light"
      brandColor="#2563eb"
      minimized={true}
    />
  );
};

export default EmbeddedChatWidget;
