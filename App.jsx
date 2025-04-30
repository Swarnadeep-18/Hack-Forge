import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { auth, onAuthStateChanged } from "./firebase/firebase";
import Navbar from "./components/Navbar";
import Hero from "./components/hero";
import About from "./components/about";
import Services from "./components/services";
import Pricing from "./components/pricing";
import Testimonial from "./components/testimonial";
import Chatbot from "./components/chatbot"; // Import chatbot
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const location = useLocation(); // Get current route

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="font-primary overflow-x-hidden">
      {/* Hide Navbar on /chatbot */}
      {location.pathname !== "/chatbot" && <Navbar user={user} />}
      
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Services />
            <Pricing />
            <Testimonial />
          </>
        } />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </div>
  );
}

export default App;
