import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // 👁️ import icons
import palmImage from "../../assets/image1.png";

function Login({ setPage }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault(); // stop page refresh
    setPage("dashboard"); // ✅ go to dashboard after login
  };

  return (
    <div className="bg-[#6306b2] flex justify-center items-center">
      <div className="h-[100vh]">
        {/* Palmpay image with automatic zoom animation */}
        <div className="flex justify-center mt-7 mb-7">
          <img
            src={palmImage}
            alt="Palmpay"
            className="w-[150px] h-auto zoom-animation"
          />
        </div>

        <div className="bg-white w-[350px] sm:w-[470px] h-[470px] p-8 rounded-[10px]">
          <h2 className="text-[25px] font-bold">Login</h2>
          <form className="pt-[40px]" onSubmit={handleLogin}>
            {/* Email */}
            <label>Email Address</label>
            <br />
            <input
              type="email"
              placeholder="Please enter your email address"
              className="bg-[#f3f3f4] w-[280px] sm:w-[400px] h-[45px] p-2 rounded-[5px] mt-2 border border-gray-300 
             focus:border-[#6205b3] focus:ring-0.1 focus:ring-[#6205b3] focus:outline-none"
              required
            />
            <br />
            <br />

            {/* Password */}
            <div className="flex justify-between items-center">
              <label>Password</label>
              <a href="#" className="text-[#6205b3] text-sm">
                Forgot password?
              </a>
            </div>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Please enter your password"
                className="bg-[#f3f3f4] w-[290px] sm:w-[400px] h-[45px] p-2 rounded-[5px] pr-10 border border-gray-300 
             focus:border-[#6205b3] focus:ring-0.1 focus:ring-[#6205b3] focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6205b3] focus:outline-none"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Login Button */}
            <div className="mt-11">
              <button
                type="submit"
                className="bg-[#6205b3] text-white w-[290px] sm:w-[400px] h-[45px] rounded-[5px] cursor-pointer hover:bg-[rgba(98,5,179,0.8)]"
              >
                Login
              </button>
            </div>

            {/* Sign up */}
            <div className="flex pt-4">
              <p className="text-[13px]">Don't have an account?</p>
              <button
                type="button"
                onClick={() => setPage("signup")} // ✅ make sure it's lowercase
                className="text-[#6205b3] text-[13px] hover:underline"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
