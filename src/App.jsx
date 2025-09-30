import React, { useState, useEffect } from "react";
import Home from "./page/Home/Home";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";
import Dashboard from "./page/Dashboard/Dashboard";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";
import Airtime from "./page/Airtime/Airtime";
import Preloader from "./components/Preloader/Preloader";

function App() {
  const [page, setPage] = useState("home"); // 👈 Always start from Home
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
    <>
      {page === "home" && <Home setPage={setPage} />}
      {page === "login" && <Login setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} currentPage={page} />}
      {page === "forgotPassword" && <ForgotPassword setPage={setPage} />}
      {page === "airtime" && <Airtime setPage={setPage} user={user} />}
    </>
  );
}

export default App;
