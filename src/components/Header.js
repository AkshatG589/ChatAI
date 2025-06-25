import React from "react";
import { Link } from "react-router-dom";
import Hamburg from "./Hamburg";
import NewChat from "./NewChat";
import User from "./User"

const Header = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="w-100 bg-light shadow-sm fixed-top">
      <div className="d-flex justify-content-between align-items-center px-3 py-2">
        {/* Left: Menu */}
        <div className="d-flex align-items-center">
          <Hamburg />
        </div>

        {/* Center: App Name + Dropdown */}
        <div className="text-center">
          <h5 className="mb-1 fw-bold">ChatGPT</h5>
          <div className="dropdown">
            <button
              className="btn btn-sm btn-outline-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Model
            </button>
            <ul className="dropdown-menu">
              <li><button className="dropdown-item">Gemini 2.5 Flash</button></li>
              <li><button className="dropdown-item" disabled>GPT-4 (coming soon)</button></li>
            </ul>
          </div>
        </div>

        {/* Right: New Chat or Sign Up */}
        <div className="d-flex align-items-center">
          {token ? (
            <NewChat />
          ) : (
            <Link to="/register" className="btn btn-dark text-white btn-sm">
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;