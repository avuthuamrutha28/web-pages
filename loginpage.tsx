import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false); // ✅ Added
  const navigate = useNavigate();

  const handleSendOtp = () => {
    console.log("Default OTP: 5678");
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp === "5678") {
      setOtpVerified(true); // ✅ Set verification to true
    } else {
      alert("Invalid OTP");
    }
  };

  const handleLogin = () => {
    if (otpVerified) {
      alert("Login Successful!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <label className="block mb-2 font-medium">Enter Mobile Number</label>
        <input
          type="text"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
        />
        <button
          onClick={handleSendOtp}
          className="w-full bg-blue-500 text-white py-2 rounded mb-4"
        >
          Send OTP
        </button>

        {otpSent && (
          <>
            <label className="block mb-2 font-medium">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-blue-500 text-white py-2 rounded mb-4"
            >
              Verify OTP
            </button>
          </>
        )}

        <button
          onClick={handleLogin}
          disabled={!otpVerified}
          className={`w-full py-2 rounded-lg ${
            otpVerified
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
