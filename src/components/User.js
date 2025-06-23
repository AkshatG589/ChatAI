// src/components/User.js
import React, { useContext, useEffect } from "react";
import AuthContext from "../context/auth/authContext";
import { useNavigate } from "react-router-dom";

const User = () => {
  const { user, getUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && !user) {
      getUser();
    }
  }, [token]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    window.location.reload(); // optional full refresh
  };

  if (!user) {
    return (
      <div className="text-center text-muted small">
        <i className="bi bi-person-circle fs-4"></i> Loading...
      </div>
    );
  }

  return (
    <div className="dropdown text-end">
      <button
        className="btn btn-light dropdown-toggle d-flex align-items-center"
        type="button"
        id="userDropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i className="bi bi-person-circle fs-4 me-2"></i>
        <span>{user.username}</span>
      </button>

      <ul
        className="dropdown-menu dropdown-menu-end p-3"
        aria-labelledby="userDropdown"
        style={{ minWidth: "250px" }}
      >
        <li>
          <div className="d-flex align-items-center mb-3">
            <i className="bi bi-person-circle fs-2 text-secondary me-3"></i>
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
    </div>
  );
};

export default User;