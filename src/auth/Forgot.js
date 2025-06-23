import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import toast from "react-hot-toast";

const Forgot = () => {
  const { forgotPassword, verifyResetOtp, resetPassword, resendOTP } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 👈 New field
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter email");
    const toastId = toast.loading("Sending OTP...");
    const res = await forgotPassword(email);
    toast.dismiss(toastId);
    if (res.success) {
      toast.success(`OTP has been sent to ${email}. Please check your inbox.`);
      setStep("otp");
      setResendDisabled(true);
      setTimer(60);
    } else {
      toast.error(res.error || "Something went wrong!");
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Enter OTP");
    const toastId = toast.loading("Verifying OTP...");
    const res = await verifyResetOtp(email, otp);
    toast.dismiss(toastId);
    if (res.success) {
      toast.success("OTP Verified!");
      setStep("reset");
    } else {
      toast.error(res.error || "Invalid OTP");
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return toast.error("All fields are required");
    if (newPassword !== confirmPassword) return toast.error("Passwords do not match");

    const toastId = toast.loading("Resetting password...");
    const res = await resetPassword(email, newPassword);
    toast.dismiss(toastId);
    if (res.success) {
      toast.success("Password reset successful!");
      navigate("/login");
    } else {
      toast.error(res.error || "Failed to reset password");
    }
  };

  const handleResendOTP = async () => {
    if (!email) return;
    setResendDisabled(true);
    setTimer(60);
    const toastId = toast.loading("Resending OTP...");
    const res = await resendOTP(email);
    toast.dismiss(toastId);
    if (res.success) {
      toast.success("OTP resent successfully!");
    } else {
      toast.error(res.error || "Failed to resend OTP");
    }
  };

  useEffect(() => {
    let interval;
    if (resendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendDisabled]);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
      <div className="p-5 rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">
          {step === "email" ? "Forgot Password" : step === "otp" ? "Verify OTP" : "Reset Password"}
        </h3>

        <form
          onSubmit={
            step === "email"
              ? handleEmailSubmit
              : step === "otp"
              ? handleOTPSubmit
              : handleResetSubmit
          }
        >
          {step === "email" && (
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
              />
            </div>
          )}

          {step === "otp" && (
            <>
              <p className="text-muted">OTP sent to <strong>{email}</strong></p>
              <div className="mb-3">
                <label className="form-label">Enter OTP</label>
                <input
                  type="text"
                  className="form-control"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
              </div>
              <div className="text-center mb-3">
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={handleResendOTP}
                  disabled={resendDisabled}
                >
                  {resendDisabled ? `Resend OTP in ${timer}s` : "Resend OTP"}
                </button>
              </div>
            </>
          )}

          {step === "reset" && (
            <>
              <div className="mb-3">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
              </div>
            </>
          )}

          <button type="submit" className="btn btn-dark text-white w-100 mt-2">
            {step === "email"
              ? "Send OTP"
              : step === "otp"
              ? "Verify OTP"
              : "Reset Password"}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link to="/login" className="text-secondary">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Forgot;