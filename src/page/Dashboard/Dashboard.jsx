import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // 👁️ import icons

function Dashboard({ setPage }) {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-lg font-bold text-gray-800">Welcome Back 👋</h1>
        <button
          onClick={() => setPage("login")}
          className="text-sm text-purple-700 font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-purple-700 text-white rounded-xl p-6 mb-8">
        <p className="text-sm">Wallet Balance</p>
        <div className="flex justify-between items-center mt-2">
          <h2 className="text-3xl font-bold">
            {showBalance ? "₦5,450.00" : "******"}
          </h2>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="ml-3 p-2 bg-purple-600 rounded-full"
          >
            {showBalance ? (
              <EyeOff className="w-5 h-5 text-white" />
            ) : (
              <Eye className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl">👤</span>
          <p className="mt-2 font-medium">Profile</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl">📱</span>
          <p className="mt-2 font-medium">Airtime</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl">🌐</span>
          <p className="mt-2 font-medium">Data</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl">🏦</span>
          <p className="mt-2 font-medium">Bank</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6 flex flex-col items-center">
          <span className="text-3xl">💳</span>
          <p className="mt-2 font-medium">Loan</p>
        </div>

        {/* ➕ Signup Action */}
        <button
          onClick={() => setPage("signup")}
          className="bg-purple-700 text-white rounded-xl p-6 flex flex-col items-center hover:bg-purple-800 transition"
        >
          <span className="text-3xl">📝</span>
          <p className="mt-2 font-medium">Signup</p>
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-3">
        <button
          onClick={() => setPage("dashboard")}
          className="text-purple-700 font-bold"
        >
          🏠 Home
        </button>
        <button
          onClick={() => setPage("transactions")}
          className="text-gray-600"
        >
          📜 Transactions
        </button>
        <button
          onClick={() => setPage("profile")}
          className="text-gray-600"
        >
          👤 Profile
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
