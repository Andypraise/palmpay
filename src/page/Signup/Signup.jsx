import React, { useState, useRef } from "react";
import { Camera, Eye, EyeOff } from "lucide-react"; // ✅ icons
import palmImage from "../../assets/image14.png"; // logo

function Signup({ setPage }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  // ✅ handle profile picture upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // ✅ Valid Nigerian phone numbers regex (MTN, Glo, Airtel, 9mobile)
  const phoneRegex = /^(0703|0706|0803|0806|0810|0813|0814|0816|0903|0906|0913|0705|0805|0815|0811|0905|0701|0708|0802|0808|0812|0901|0902|0904|0809|0817|0818|0909|0908)[0-9]{7}$/;

  const handleSignup = () => {
    if (!email || !phone || !password) {
      setMessage("Please fill in all fields");
      return;
    }

    if (!phoneRegex.test(phone)) {
      setMessage(
        "Invalid phone number. Must be 11 digits and a valid MTN, Glo, Airtel, or 9mobile number."
      );
      return;
    }

    setLoading(true);
    setMessage("Please wait...");

    // Simulate API delay (5 sec)
    setTimeout(() => {
      const newUser = {
        email,
        phone,
        password,
        name: `User-${phone.slice(-4)}`,
        profilePic: profilePic,
      };
      localStorage.setItem("user", JSON.stringify(newUser));

      setLoading(false);
      setMessage("✅ Account created successfully!");

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
          className="text-2xl text-gray-700 cursor-pointer"
        >
          ←Back
        </button>
      </div>

      {/* Logo */}
      <div className="flex">
        <img src={palmImage} alt="Logo" className="w-[150px] h-[150px]" />
      </div>

      {/* Title */}
      <h2 className="text-xl text-gray-800 mt-2">Let's Create an Account</h2>

      {/* ✅ Profile Picture Upload */}
      <div className="mt-6 flex justify-center">
        <div className="relative w-28 h-28 group">
          <img
            src={
              profilePic ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile Preview"
            className="w-28 h-28 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
            onClick={() => fileInputRef.current.click()}
          />

          {/* Hover Overlay */}
          <div
            onClick={() => fileInputRef.current.click()}
            className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center 
              opacity-0 group-hover:opacity-100 transition "
          >
            <Camera className="w-6 h-6 text-white" />
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="mt-6 w-full">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
          className="w-full border border-gray-300 rounded-md h-[50px] px-3 outline-none text-gray-800 placeholder-gray-400"
        />
      </div>

      {/* Phone Input */}
      <div className="mt-4 w-full">
        <div className="flex items-center border border-gray-300 rounded-md h-[50px] px-3">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🇳🇬</span>
            <span className="font-medium text-gray-700">+234</span>
          </div>
          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 11))
            }
            placeholder="Enter phone number"
            className="ml-3 flex-1 outline-none text-gray-800 placeholder-gray-400"
            maxLength={11}
          />
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

      {/* Password Input */}
      <div className="mt-4 w-full relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="w-full border border-gray-300 rounded-md h-[50px] px-3 outline-none text-gray-800 placeholder-gray-400"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-3 text-gray-600"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Sign Up Button */}
      <div className="mt-8 mb-10 w-full relative">
        <button
          onClick={handleSignup}
          disabled={loading}
          className={`w-full h-[50px] rounded-md text-white font-semibold text-lg transition cursor-pointer
          ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#6205b3] hover:bg-[#4e0490]"}`}
        >
          {loading ? "Please wait..." : "Sign Up"}
        </button>
        <span className="absolute right-4 top-[-14px] bg-yellow-400 text-[12px] px-2 py-1 rounded-full shadow">
          🎁 Get ₦5,450 Bonus
        </span>
      </div>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}

export default Signup;
