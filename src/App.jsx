import React, { useState, useEffect } from "react";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";
import Dashboard from "./page/Dashboard/Dashboard";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";
import Airtime from "./page/Airtime/Airtime"; // ✅ import Airtime page

function App() {
  // Load last page from localStorage, default to login
  const [page, setPage] = useState(() => {
    const saved = localStorage.getItem("currentPage");
    // Only allow valid pages
    return ["login", "signup", "dashboard", "forgotPassword", "airtime"].includes(saved)
      ? saved
      : "login";
  });

  // Save page changes in localStorage
  useEffect(() => {
    localStorage.setItem("currentPage", page);
  }, [page]);

  // Load user from localStorage for Airtime page
  const user = JSON.parse(localStorage.getItem("user"));

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
