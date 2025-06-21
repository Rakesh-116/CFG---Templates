import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ChatWidget from "./components/ChatWidget";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import SDKChat from "./pages/SDKChat";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sdk-chat" element={<SDKChat />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
      {/* Don't show ChatWidget on SDK chat page */}
      <Routes>
        <Route path="/sdk-chat" element={null} />
        <Route path="*" element={<ChatWidget />} />
      </Routes>
    </Router>
  );
};

export default App;
