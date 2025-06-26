import React from "react";
import { Link } from "react-router-dom";

const GuestMessages = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div className="text-center">
        <h4 className="text-secondary">
          <Link to="/login" className="text-decoration-none text-primary">
            Login
          </Link>{" "}
          /{" "}
          <Link to="/register" className="text-decoration-none text-primary">
            Signup
          </Link>{" "}
          to start chat with chatAi 
        </h4>
      </div>
    </div>
  );
};

export default GuestMessages;