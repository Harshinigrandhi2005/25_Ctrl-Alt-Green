import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/DashBoard";
import Navbar from './components/Navbar';
import ScrapForm from "./components/Scrapform"; // Fixed capitalization
import Marketplace from "./components/MarketPlace"; // Fixed capitalization
import MetalPrices from "./components/MetalPrices"; // Ensure this file exists

function App() {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const scrapcycle = document.querySelector('.scrapcycle');

    // Create one leaf element (image) and add it to the screen
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    document.body.appendChild(leaf); // Add the leaf to the body to make it fly around

    // Trigger text animation for ScrapCycle text
    setTimeout(() => {
      scrapcycle.style.opacity = 1;
    }, 1000); // Start fade-in after 1 second for smooth effect

    // After animation ends (let's say 4 seconds), set animationComplete to true
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 4000); // Adjust based on your animation time (4 seconds here)

    // Clean up the timer on unmount
    return () => clearTimeout(timer);
  }, []);

  return (
    
    <Router>
      
      <div className="App">
        {animationComplete ? (
          <>
            <Navbar />  {/* Navbar included */}
            <div className="app-container">

              <Routes>
                <Route path="/" element={<ScrapForm />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/metal-prices" element={<MetalPrices />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Routes>
            </div>
          </>
        ) : (
          <div className="scrapcycle">
            <span className="s">S</span>crap<span className="c">C</span>ycle
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;