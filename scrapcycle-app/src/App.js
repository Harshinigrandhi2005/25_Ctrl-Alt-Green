import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ScrapForm from "./components/Scrapform";
import Marketplace from "./components/MarketPlace";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="navigation">
          <Link to="/">Sell Scrap</Link>
          <Link to="/marketplace">Marketplace</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ScrapForm />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;