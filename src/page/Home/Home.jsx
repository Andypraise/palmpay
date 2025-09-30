import React, { useEffect, useState } from "react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import logoImage from "../../assets/logo.png";

function Home({ setPage }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const trades = [
    { id: 1, text: "💳 John bought ₦500 airtime" },
    { id: 2, text: "⚡ Ada transferred ₦5,000" },
    { id: 3, text: "📱 Uche bought 2GB data" },
    { id: 4, text: "💰 Sarah funded wallet ₦10,000" },
  ];

  // Show one trade at a time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trades.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [trades.length]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-950 to-black text-white px-6 overflow-hidden relative">
      {/* Glowing backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,215,0,0.15),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(138,43,226,0.2),transparent_70%)]"></div>

      {/* Floating trade/chat messages (top) */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <AnimatePresence mode="wait">
          <Motion.div
            key={trades[currentIndex].id}
            className="backdrop-blur-md bg-white/10 text-yellow-300 px-4 py-2 rounded-lg shadow-lg text-sm font-medium border border-yellow-400/30 text-center"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            {trades[currentIndex].text}
          </Motion.div>
        </AnimatePresence>
      </div>

      {/* Logo */}
      <Motion.div
        className="flex items-center mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img src={logoImage} alt="PulsePay Logo" className="w-[85px] drop-shadow-lg" />
        <h1 className="text-5xl font-extrabold ml-3 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
          PulsePay
        </h1>
      </Motion.div>

      {/* About */}
      <Motion.p
        className="text-center max-w-2xl text-lg text-gray-300 mb-10 leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Experience <span className="text-yellow-400 font-semibold">luxury in payments</span>.  
        With PulsePay, fund your wallet, buy airtime, and make transfers seamlessly —  
        fast, secure, and beautifully simple.
      </Motion.p>

      {/* Buttons */}
      <Motion.div
        className="flex gap-5 mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <button
          onClick={() => setPage("signup")}
          className="px-7 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-bold rounded-lg shadow-lg hover:opacity-90 transition cursor-pointer"
        >
          Sign Up
        </button>
        <button
          onClick={() => setPage("login")}
          className="px-7 py-3 border border-yellow-400 text-yellow-400 rounded-lg hover:bg-yellow-400 hover:text-black transition cursor-pointer"
        >
          Login
        </button>
      </Motion.div>

      {/* Get Started with shimmer */}
      <Motion.button
        onClick={() => setPage("signup")}
        className="relative flex items-center gap-2 bg-gradient-to-r from-purple-700 to-purple-500 px-10 py-4 rounded-xl font-semibold cursor-pointer overflow-hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="relative z-10">Get Started</span>
        <ArrowRight className="w-5 h-5 relative z-10" />
        {/* shimmer effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></span>
      </Motion.button>

      {/* shimmer animation keyframes */}
      <style>
        {`
          @keyframes shimmer {
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
}

export default Home;
