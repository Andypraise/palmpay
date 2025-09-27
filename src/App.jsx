import React, { useState, useEffect } from "react";
import "./index.css";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";
import Dashboard from "./page/Dashboard/Dashboard"; // ✅ new page
import Preloader from "./components/Preloader/Preloader";

function App() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState("login"); // "login", "signup", or "dashboard"

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <Preloader />
      ) : page === "login" ? (
        <Login setPage={setPage} />
      ) : page === "signup" ? (
        <Signup setPage={setPage} />
      ) : (
        <Dashboard setPage={setPage} />
      )}
    </div>
  );
}

export default App;
