// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './Navbar.css'; // Import the CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left section for Logo */}
        <div className="logo">
          {/* <img src="logo.png" class="common-logo"></img> */}
          <h1>ScrapCycle</h1>
        </div>

        {/* Center section for navigation links */}
        <div className="nav-links">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/">Sell Scrap</Link></li>
            <li><Link to="/marketplace">Market Place</Link></li>
            <li><Link to="/metal-prices">Metal Prices</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        {/* Right section for user actions (e.g., login or profile) */}
        <div className="user-actions">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;