import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react"; 
import profileImage from "../../assets/image3.png";
import customerImage from "../../assets/image4.png";
import codeImage from "../../assets/image12.png";
import notificationImage from "../../assets/image11.png";
import timeImage from "../../assets/image5.png";
import dataImage from "../../assets/image7.png";
import bankImage from "../../assets/image9.png";
import loanImage from "../../assets/image8.png";
import withImage from "../../assets/image10.png";
import homeImage from "../../assets/image16.png";
import tranImage from "../../assets/image17.png";

function Dashboard({ setPage, currentPage }) {
  const [showBalance, setShowBalance] = useState(true);
  const [user, setUser] = useState(null);

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Quick Actions (dynamic array)
  const actions = [
    { name: "Airtime", image: timeImage, page: "airtime" },
    { name: "Data", image: dataImage, page: "data" },
    { name: "Bank", image: bankImage, page: "bank" },
    { name: "Loan", image: loanImage, page: "loan" },
    { name: "Withdraw", image: withImage, page: "withdraw" },
    { name: "PulsePay", image: withImage, page: "pulsepay" },
  ];

  // Bottom Nav (dynamic array)
  const navItems = [
    { name: "Home", image: homeImage, page: "dashboard" },
    { name: "Transactions", image: tranImage, page: "transactions" },
    { name: "Profile", image: profileImage, page: "profile" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <img
            src={user?.profilePic || profileImage}
            alt="profile"
            className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
          />
          <h1 className="text-[20px] ml-2">
            Hi, {user?.name || user?.phone || "User"}
          </h1>
        </div>
        <div className="flex">
          <img src={customerImage} alt="" className="w-[30px] sm:w-[40px] h-[30px] sm:h-[40px] cursor-pointer mr-[5px]" />
          <img src={codeImage} alt="" className="w-[30px] sm:w-[40px] h-[30px] sm:h-[40px] cursor-pointer mr-[5px]" />
          <img src={notificationImage} alt="" className="w-[30px] sm:w-[40px] h-[30px] sm:h-[40px] cursor-pointer mr-[5px]" />
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-xl p-6 mb-8 shadow-lg">
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
      <div className="grid grid-cols-3 gap-4 bg-white rounded-xl p-4">
        {actions.map((action, index) => (
          <div
            key={index}
            onClick={() => setPage(action.page)}
            className="cursor-pointer rounded-xl p-4 flex flex-col items-center hover:bg-purple-50 transition"
          >
            <img src={action.image} alt={action.name} className="w-[36px] h-[36px] mb-2" />
            <p className="text-sm font-medium">{action.name}</p>
          </div>
        ))}
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setPage(item.page)}
            className={`flex flex-col items-center text-xs ${
              currentPage === item.page
                ? "text-purple-700 font-bold"
                : "text-gray-600"
            }`}
          >
            {item.image ? (
              <img src={item.image} alt={item.name} className="w-[24px] h-[24px] mb-1" />
            ) : (
              <span className="text-lg mb-1">{item.icon}</span>
            )}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
