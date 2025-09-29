import React from "react";

function Dashboard({ setPage }) {
  const handleLogout = () => {
    localStorage.removeItem("currentPage"); // clear saved page
    setPage("login"); // go back to login
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome to Dashboard</h1>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
