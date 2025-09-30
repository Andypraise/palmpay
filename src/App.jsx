import React, { useState, useEffect } from "react";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";
import Dashboard from "./page/Dashboard/Dashboard";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";
import Airtime from "./page/Airtime/Airtime";
import Preloader from "./components/Preloader/Preloader"; // ✅ import Preloader

function App() {
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("currentPage");
    return ["login", "signup", "dashboard", "forgotPassword", "airtime"].includes(saved)
      ? saved
      : "login";
  });

  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    localStorage.setItem("currentPage", page);

    // Simulate loading (e.g., fetch data or delay)
    const timer = setTimeout(() => {
      setLoading(false); // hide preloader after 1.5s
    }, 5000);

    return () => clearTimeout(timer);
  }, [page]);

  const user = JSON.parse(localStorage.getItem("user"));

  if (loading) return <Preloader />; // show preloader while loading

  return (
    <>
      {page === "login" && <Login setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} currentPage={page} />}
      {page === "forgotPassword" && <ForgotPassword setPage={setPage} />}
      {page === "airtime" && <Airtime setPage={setPage} user={user} />}
    </>
  );
}

export default App;
