import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import toast from "react-hot-toast";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Logging in...");
    const res = await login(credentials.email, credentials.password);
    toast.dismiss(toastId);
    if (res.authToken) {
      toast.success("Login successful!");
      navigate("/");
    } else {
      toast.error(res.error || "Login failed");
    }
  };

  // 🔒 Placeholder for social logins
  const handleGoogleLogin = () => {
    toast("Google login will be available soon!", { icon: "🔐" });
  };

  const handleFacebookLogin = () => {
    toast("Facebook login will be available soon!", { icon: "🔐" });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="p-5 rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login to Your Account</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="loginEmail" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="loginEmail"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="loginPassword" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="loginPassword"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="btn btn-dark text-white w-100 mt-2">Login</button>
        </form>

        <div className="d-flex align-items-center my-3">
          <div className="flex-grow-1">
            <hr />
            </div>
              <div className="px-2 text-muted">or</div>
              <div className="flex-grow-1">
              <hr />
            </div>
          </div>

        <div className="d-grid gap-2">
          <button className="btn btn-dark text-white" onClick={handleGoogleLogin}>
            <i className="bi bi-google me-2"></i> Sign in with Google
          </button>
          <button className="btn btn-dark text-white" onClick={handleFacebookLogin}>
            <i className="bi bi-facebook me-2"></i> Sign in with Facebook
          </button>
        </div>

        <div className="text-center mt-3">
          <p>
            <Link to="/forgot" className="text-danger">Forgot Password?</Link>
          </p>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-primary">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;