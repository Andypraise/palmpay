import React, { useState, useEffect } from "react";
import { Eye, EyeOff, LogOut, Wifi } from "lucide-react"; 
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
  const [network, setNetwork] = useState(""); // Airtime network

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);

      // If phone exists, detect network immediately
      if (storedUser.phone) {
        setNetwork(detectNetwork(storedUser.phone));
      }
    }
  }, []);

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setPage("login");
  };

  // Detect network function
  const detectNetwork = (phone) => {
    if (!phone) return "";
    const prefix = phone.slice(0, 4);
    if (/^(0803|0806|0703|0706|0813|0816|0810|0814|0903|0906)$/.test(prefix)) return "MTN";
    if (/^(0805|0807|0811|0815|0905|0915)$/.test(prefix)) return "GLO";
    if (/^(0802|0808|0708|0701|0812|0902|0907|0912)$/.test(prefix)) return "Airtel";
    if (/^(0809|0817|0818|0909|0908)$/.test(prefix)) return "9mobile";
    return "";
  };

  // Quick Actions
  const actions = [
    { name: "Airtime", image: timeImage, page: "airtime" },
    { name: "Data", image: dataImage, page: "data" },
    { name: "Bank", image: bankImage, page: "bank" },
    { name: "Loan", image: loanImage, page: "loan" },
    { name: "Withdraw", image: withImage, page: "withdraw" },
    { name: "PulsePay", image: withImage, page: "pulsepay" },
  ];

  // Bottom Nav
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

        <div className="flex items-center gap-3">
          <img src={customerImage} alt="" className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] cursor-pointer" />
          <img src={codeImage} alt="" className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] cursor-pointer" />
          <img src={notificationImage} alt="" className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] cursor-pointer" />

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 cursor-pointer text-black px-3 py-1 rounded-lg text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
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
            {showBalance ? <EyeOff className="w-5 h-5 text-white" /> : <Eye className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-4 bg-white rounded-xl p-4">
        {actions.map((action, index) => (
          <div
            key={index}
            onClick={() => {
              setPage(action.page);
            }}
            className="cursor-pointer rounded-xl p-4 flex flex-col items-center hover:bg-purple-50 transition"
          >
            <img src={action.image} alt={action.name} className="w-[36px] h-[36px] mb-2" />
            <p className="text-sm font-medium">{action.name}</p>
            {/* Show network icon for Airtime */}
            {action.name === "Airtime" && network && (
              <div className="mt-2 flex items-center text-xs text-gray-700 gap-1">
                <Wifi size={16} /> {network}
              </div>
            )}
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
              currentPage === item.page ? "text-purple-700 font-bold" : "text-gray-600"
            }`}
          >
            {item.image ? <img src={item.image} alt={item.name} className="w-[24px] h-[24px] mb-1" /> : <span className="text-lg mb-1">{item.icon}</span>}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
