import React, { useContext, useEffect, useState, useRef } from "react";
import AuthContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";

const User = () => {
  const { user, getUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (token && !user) {
      getUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="text-center text-muted small">
        <i className="bi bi-person-circle fs-4"></i> Loading...
      </div>
    );
  }

  return (
    <div className="text-end position-relative" ref={dropdownRef}>
      {/* Dropdown (Above the button) */}
      {showDropdown && (
        <ul
          className="dropdown-menu dropdown-menu-end p-3 show"
          style={{
            minWidth: "250px",
            position: "absolute",
            bottom: "100%",
            right: 0,
            zIndex: 1060,
            marginBottom: "10px",
          }}
        >
          <li>
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-person-circle fs-1 text-secondary me-3"></i>
              <div>
                <div className="fw-bold">{user.username}</div>
                <div className="text-muted small">{user.email}</div>
              </div>
            </div>
          </li>
          <li>
            <button className="btn btn-outline-danger w-100" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </li>
        </ul>
      )}

      {/* Button */}
      <button
        className="btn btn-light d-flex align-items-center"
        type="button"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <i className="bi bi-person-circle fs-4 me-2"></i>
        <span className="me-1">{user.username}</span>
        <i className="bi bi-caret-down-fill"></i> {/* Dropdown arrow */}
      </button>
    </div>
  );
};

export default User;