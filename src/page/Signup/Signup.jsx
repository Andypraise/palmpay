import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom"; // ✅ Router navigation
import palmImage from "../../assets/image13.png";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ for navigation

  const handleSignup = (e) => {
    e.preventDefault();

    setLoading(true); // show loading
    setTimeout(() => {
      // After 5 seconds create account
      const newUser = {
        name: `${firstName} ${lastName}`,
        email,
        password,
        phone: "",
        balance: 0,
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      setLoading(false);

      navigate("/dashboard"); // ✅ Redirect to dashboard
    }, 5000);
  };

  return (
    <div className="bg-[#6306b2] flex justify-center items-center flex-col min-h-screen">
      <div className="h-[100%]">
        <div className="flex justify-center mt-1">
          <img
            src={palmImage}
            alt="Pulsepay"
            className="w-[130px] h-[120px] zoom-animation"
          />
        </div>
        <div className="bg-white w-[350px] sm:w-[470px] h-auto p-8 rounded-[10px] shadow-lg mt-1">
          <h2 className="text-[20px] font-bold mt-5 uppercase">
            Let's Create an Account
          </h2>

          {/* Signup Form */}
          <form onSubmit={handleSignup} className="mt-5">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Please enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="bg-[#f3f3f4] w-full h-[45px] p-2 rounded-[5px] mt-2 border border-gray-300 
              focus:border-[#6205b3] focus:ring-1 focus:ring-[#6205b3] focus:outline-none"
              required
            />
            <br /><br />

            <label>Last Name</label>
            <input
              type="text"
              placeholder="Please enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="bg-[#f3f3f4] w-full h-[45px] p-2 rounded-[5px] mt-2 border border-gray-300 
              focus:border-[#6205b3] focus:ring-1 focus:ring-[#6205b3] focus:outline-none"
              required
            />
            <br /><br />

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Please enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#f3f3f4] w-full h-[45px] p-2 rounded-[5px] mt-2 border border-gray-300 
              focus:border-[#6205b3] focus:ring-1 focus:ring-[#6205b3] focus:outline-none"
              required
            />
            <br /><br />

            {/* Password */}
            <div className="flex justify-between items-center mt-2">
              <label className="text-gray-700">Password</label>
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

            <p className="text-[13px] mt-5">
              By clicking the "Create My Account" button, you agree to PulsePay
              Service Overview & Acceptable Use Policy
            </p>

            {/* Signup Button */}
            <div className="mt-9">
              <button
                type="submit"
                disabled={loading}
                className={`w-full h-[45px] rounded-[5px] cursor-pointer text-white 
                  ${loading ? "bg-gray-400" : "bg-[#6205b3] hover:bg-[rgba(98,5,179,0.85)]"}`}
              >
                {loading ? "Creating account..." : "Create My Account"}
              </button>
            </div>

            {/* Already have account */}
            <div className="flex pt-4 ">
              <p className="text-[13px]">Already have an account?&nbsp;</p>
              <button
                type="button"
                onClick={() => navigate("/login")} // ✅ Router navigation
                className="text-[#6205b3] text-[13px] hover:underline"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
