import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Custom from "./pages/Custom";
import Quote from "./pages/Quote";
import Chatbot from "./components/Chatbot";

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname, search, hash]);

  return null;
}

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout onOpenChat={() => setIsChatbotOpen(true)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services onOpenChat={() => setIsChatbotOpen(true)} />} />
          <Route path="/custom" element={<Custom onOpenChat={() => setIsChatbotOpen(true)} />} />
          <Route path="/quote" element={<Quote onOpenChat={() => setIsChatbotOpen(true)} />} />
        </Routes>
      </Layout>
      <Chatbot isOpen={isChatbotOpen} onOpen={() => setIsChatbotOpen(true)} onMinimize={() => setIsChatbotOpen(false)} />
    </BrowserRouter>
  );
}

export default App;