import React, { useState } from "react";
import Swal from "sweetalert2";
import { initiateForgotPassword, verifyOTP } from "../../api/AuthRequest";
import { resetPassword } from "../../actions/AuthAction.js";
import "./ForgotPasswordModal.css";
import { useDispatch } from "react-redux";

const ForgotPasswordModal = ({ open, onClose }) => {
  const [step, setStep] = useState("username");
  const [username, setUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (step === "username") {
        const response = await initiateForgotPassword(username);
        if (response.data.message === "OTP sent successfully") {
          setStep("otp");
        } else {
          Swal.fire({
            icon: "error",
            title: "Failed to Send OTP",
            text: "An error occurred while sending OTP. Please try again.",
          });
        }
      } else if (step === "otp") {
        const response = await verifyOTP(username, otp);
        if (response.data.message === "OTP verified successfully") {
          setStep("password");
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid OTP",
            text: "Please enter a valid OTP.",
          });
        }
      } else if (step === "password") {
        if (newPassword !== confirmNewPassword) {
          Swal.fire({
            icon: "error",
            title: "Passwords Do Not Match",
            text: "Please make sure your passwords match.",
          });
          return;
        }

        await dispatch(resetPassword(username, otp, newPassword));
        Swal.fire({
          icon: "success",
          title: "Password Reset Successful",
          text: "Your password has been successfully reset.",
        });
        onClose();
        setUsername("");
        setOtp("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    open && (
      <div className="forgot-password-modal-overlay" onClick={onClose}>
        <div
          className="forgot-password-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {step === "username" && (
            <form onSubmit={handleSubmit}>
              <h4>Enter Your Registered Email</h4>
              <input
                type="email"
                placeholder="Email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <button type="submit">Send OTP</button>
            </form>
          )}
          {step === "otp" && (
            <form onSubmit={handleSubmit}>
              <h4>Enter OTP</h4>
              <input
                type="text"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit">Verify OTP</button>
            </form>
          )}
          {step === "password" && (
            <form onSubmit={handleSubmit}>
              <h4>Reset Your Password</h4>
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
              <button type="submit">Update Password</button>
            </form>
          )}
        </div>
      </div>
    )
  );
};

export default ForgotPasswordModal;
