import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (savedUser && savedUser.email === email.trim()) {
      setMessage("✅ Password reset link sent to your email!");
    } else {
      setMessage("❌ Email not found. Please sign up first.");
    }
  };

  return (
    <div className="bg-[#6306b2] flex justify-center items-center h-[100vh]">
      <div className="bg-white w-[350px] sm:w-[470px] p-8 rounded-[10px] shadow-lg">
        <h2 className="text-[22px] font-bold mb-4">Forgot Password</h2>

        <form onSubmit={handleReset}>
          <label className="text-gray-700">Enter your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Please enter your email"
            className="bg-[#f3f3f4] w-full h-[45px] p-2 mt-2 rounded-[5px] border border-gray-300 
            focus:border-[#6205b3] focus:ring-1 focus:ring-[#6205b3] focus:outline-none"
            required
          />

          <button
            type="submit"
            className="bg-[#6205b3] text-white w-full h-[45px] mt-6 rounded-[5px] cursor-pointer hover:bg-[rgba(98,5,179,0.85)]"
          >
            Reset Password
          </button>
        </form>

        {message && <p className="mt-4 text-center text-sm">{message}</p>}

        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/login")}
            className="text-[#6205b3] text-sm hover:underline"
          >
             Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
