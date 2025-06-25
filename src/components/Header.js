import React from "react";
import { Link } from "react-router-dom";
import Hamburg from "./Hamburg";
import NewChat from "./NewChat";

const Header = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="w-100 bg-light shadow-sm fixed-top">
      <div className="d-flex justify-content-between align-items-center px-3 py-2">
        {/* Left: Menu */}
        <div className="d-flex align-items-center">
          <Hamburg />
        </div>

        {/* Center: App Name */}
        <div className="text-center w-100">
          <h3 className="mb-0 fw-bold ">ChatAI</h3>
        </div>

        {/* Right: New Chat or Sign Up */}
        <div className="d-flex align-items-center">
          {token ? (
            <NewChat />
          ) : (
            <Link to="/register" className="btn btn-dark text-white btn-sm">
              SignUp
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;