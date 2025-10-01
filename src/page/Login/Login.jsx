import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import palmImage from "../../assets/image13.png";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      setMessage("❌ No account found. Please sign up first.");
      return;
    }

    if (
      savedUser.email === email.trim() &&
      savedUser.password === password.trim()
    ) {
      setMessage("✅ Login successful!");
      localStorage.setItem("loggedInUser", JSON.stringify(savedUser));

      setTimeout(() => {
        navigate("/dashboard"); // ✅ redirect
      }, 1500);
    } else {
      setMessage("❌ Invalid email or password.");
    }
  };

  return (
    <div className="bg-[#6306b2] flex justify-center items-center">
      <div className="h-[100vh]">
        {/* Logo */}
        <div className="flex justify-center mt-2">
          <img
            src={palmImage}
            alt="App Logo"
            className="w-[150px] h-[120px] zoom-animation"
          />
        </div>

        <div className="bg-white w-[350px] sm:w-[470px] h-[470px] p-8 rounded-[10px] shadow-lg">
          <h2 className="text-[25px] font-bold">Login</h2>

          <form className="pt-[40px]" onSubmit={handleLogin}>
            {/* Email */}
            <label className="text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please enter your email address"
              className="bg-[#f3f3f4] w-full h-[45px] p-2 rounded-[5px] mt-2 border border-gray-300 
              focus:border-[#6205b3] focus:ring-1 focus:ring-[#6205b3] focus:outline-none"
              required
            />

            {/* Password */}
            <div className="flex justify-between items-center mt-5">
              <label className="text-gray-700">Password</label>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-[#6205b3] text-sm hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Please enter your password"
                className="bg-[#f3f3f4] w-full h-[45px] p-2 rounded-[5px] pr-10 border border-gray-300 
                focus:border-[#6205b3] focus:ring-1 focus:ring-[#6205b3] focus:outline-none"
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
            <div className="mt-10">
              <button
                type="submit"
                className="bg-[#6205b3] text-white w-full h-[45px] rounded-[5px] cursor-pointer hover:bg-[rgba(98,5,179,0.85)]"
              >
                Login
              </button>
            </div>

            {/* Message */}
            {message && (
              <p className="mt-4 text-center text-sm text-gray-700">
                {message}
              </p>
            )}

            {/* Sign up */}
            <div className="flex pt-4">
              <p className="text-[13px]">Don't have an account?&nbsp;</p>
              <button
                type="button"
                onClick={() => navigate("/signup")}
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
