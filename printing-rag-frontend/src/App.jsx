import { useState } from "react";
import Home from "./pages/Home";
import Chatbot from "./components/Chatbot";

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <>
      <Home onOpenChat={() => setIsChatbotOpen(true)} />

      <Chatbot
        isOpen={isChatbotOpen}
        onOpen={() => setIsChatbotOpen(true)}
        onMinimize={() => setIsChatbotOpen(false)}
      />
    </>
  );
}

export default App;