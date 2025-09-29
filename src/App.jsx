import React, { useState } from "react";
import Login from "./page/Login/Login";
import Signup from "./page/Signup/Signup";
import Dashboard from "./page/Dashboard/Dashboard";
import ForgotPassword from "./page/ForgotPassword/ForgotPassword";

function App() {
  const [page, setPage] = useState("login");

  return (
    <>
      {page === "login" && <Login setPage={setPage} />}
      {page === "signup" && <Signup setPage={setPage} />}
      {page === "dashboard" && <Dashboard setPage={setPage} />}
      {page === "forgotPassword" && <ForgotPassword setPage={setPage} />}
    </>
  );
}

export default App;
