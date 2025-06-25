import React, { useState,useEffect } from "react";
import AuthContext from "./authContext";

const AuthState = ({ children }) => {
  const host = process.env.REACT_APP_API_BASE;

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (token) {
      getUser();
    } else {
      setLoading(false);
    }
  }, [token]);

  // 📌 Register User
  const register = async (userData) => {
    alert(process.env.REACT_APP_API_BASE)
    const res = await fetch(`${host}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    return data;
  };

  // 📌 Verify OTP
  const verifyOTP = async (email, otp) => {
    const res = await fetch(`${host}/api/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.authToken);
      setToken(data.authToken);
    }
    return data;
  };

  // 📌 Login
  const login = async (email, password) => {
    const res = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.authToken);
      setToken(data.authToken);
    }
    return data;
  };

  // 📌 Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // 📌 Get Authenticated User
  const getUser = async () => {
  try {
    const res = await fetch(`${host}/api/auth/getuser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user); // still good for context
      return { user: data.user }; // ✅ return user to Home
    } else {
      logout();
      return { error: data.error };
    }
  } catch (err) {
    logout();
    return { error: "Something went wrong" };
  } finally {
    setLoading(false);
  }
};

  // 📌 Forgot Password
  const forgotPassword = async (email) => {
    const res = await fetch(`${host}/api/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    return await res.json();
  };

  // 📌 Reset Password
  const resetPassword = async (email, newPassword) => {
    const res = await fetch(`${host}/api/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    });

    return await res.json();
  };
  // 📌 Pseudocode for verifying OTP during forgot password
const verifyResetOtp = async (email, otp) => {
  try {
    const res = await fetch(`${host}/api/auth/verify-reset-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, otp })
    });

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Verify Reset OTP Error:", error);
    return { success: false, error: "Network/server error" };
  }
};

const resendOTP = async (email) => {
  try {
    const res = await fetch(`${host}/api/auth/resend-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const json = await res.json();
    return json;
  } catch (error) {
    console.error("Resend OTP Error:", error);
    return { success: false, error: "Network/server error" };
  }
};
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        register,
        verifyOTP,
        login,
        logout,
        getUser,
        forgotPassword,
        resetPassword,
        verifyResetOtp,
        resendOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;