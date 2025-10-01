import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";
import Dashboard from "./page/Dashboard/Dashboard";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";
import Airtime from "./page/Airtime/Airtime";
import Preloader from "./components/Preloader/Preloader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Preloader delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  if (loading) return <Preloader />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />             {/* Landing/Home */}
        <Route path="/login" element={<Login />} />       {/* Login */}
        <Route path="/signup" element={<Signup />} />     {/* Signup */}
        <Route path="/dashboard" element={<Dashboard user={user} />} /> {/* Dashboard */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/airtime" element={<Airtime user={user} />} />     {/* Airtime */}
      </Routes>
    </Router>
  );
}

export default App;
