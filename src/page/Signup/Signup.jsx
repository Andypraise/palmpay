import React, { useState } from "react";
import palmImage from "../../assets/image2.png"; // Palmpay logo

function Signup({ setPage }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignup = () => {
    if (!phone) {
      setMessage("Please enter your phone number");
      return;
    }

    setLoading(true);
    setMessage("Please wait...");

    // Simulate API delay (5 sec)
    setTimeout(() => {
      setLoading(false);
      setMessage("✅ Account created successfully!");
      // Redirect to dashboard after 2 sec
      setTimeout(() => {
        setPage("dashboard");
      }, 2000);
    }, 5000);
  };

  return (
    <div className="bg-white min-h-screen flex flex-col px-6 pt-12">
      {/* Top Header */}
      <div className="w-full flex items-center">
        <button
          onClick={() => setPage("login")}
          className="text-2xl text-gray-700"
        >
          ←
        </button>
      </div>

      {/* Logo */}
      <div className="flex mt-4">
        <img src={palmImage} alt="Palmpay Logo" className="w-[200px]" />
      </div>

      {/* Title */}
      <h2 className="text-xl text-gray-800 mt-6">
        Let&apos;s Create an Account
      </h2>

      {/* Phone Input */}
      <div className="mt-6 w-full">
        <div className="flex items-center border border-gray-300 rounded-md h-[50px] px-3">
          {/* Country Flag + Code */}
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🇳🇬</span>
            <span className="font-medium text-gray-700">+234</span>
          </div>
          {/* Input */}
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="ml-3 flex-1 outline-none text-gray-800 placeholder-gray-400"
          />
          {/* Clear button */}
          {phone && (
            <button
              type="button"
              onClick={() => setPhone("")}
              className="text-gray-400 text-lg"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Sign Up Button */}
      <div className="mt-8 w-full relative">
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full h-[50px] rounded-md text-white font-semibold text-lg transition 
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#6205b3] hover:bg-[#4e0490]"}`}
        >
          {loading ? "Please wait..." : "Sign Up"}
        </button>
        {/* Yellow Bonus Badge */}
        <span className="absolute right-4 top-[-14px] bg-yellow-400 text-[12px] px-2 py-1 rounded-full shadow">
          🎁 Get ₦5,450 Bonus
        </span>
      </div>

      {/* Message */}
      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}

export default Signup;
