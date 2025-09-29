import React, { useState, useEffect, useRef } from "react";
import { Eye, EyeOff, LogOut } from "lucide-react"; 
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
  const [showLogoutModal, setShowLogoutModal] = useState(false); // logout modal
  const fileInputRef = useRef(null); // hidden file input ref

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Handle profile picture change
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const updatedUser = { ...user, profilePic: reader.result };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
      };
      reader.readAsDataURL(file);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    setPage("login");
    setShowLogoutModal(false);
  };

  const actions = [
    { name: "Airtime", image: timeImage, page: "airtime" },
    { name: "Data", image: dataImage, page: "data" },
    { name: "Bank", image: bankImage, page: "bank" },
    { name: "Loan", image: loanImage, page: "loan" },
    { name: "Withdraw", image: withImage, page: "withdraw" },
    { name: "PulsePay", image: withImage, page: "pulsepay" },
  ];

  const navItems = [
    { name: "Home", image: homeImage, page: "dashboard" },
    { name: "Transactions", image: tranImage, page: "transactions" },
    { name: "Profile", image: profileImage, page: "profile" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4 relative">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          {/* Profile Image */}
          <img
            src={user?.profilePic || profileImage}
            alt="profile"
            className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
            onClick={() => fileInputRef.current.click()} // trigger file input
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleProfileChange}
          />
          <h1 className="text-[20px] ml-2">
            Hi, {user?.name || user?.phone || "User"}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <img src={customerImage} alt="" className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] cursor-pointer" />
          <img src={codeImage} alt="" className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] cursor-pointer" />
          <img src={notificationImage} alt="" className="w-[25px] h-[25px] sm:w-[30px] sm:h-[30px] cursor-pointer" />

          {/* Logout Button */}
          <button
            onClick={() => setShowLogoutModal(true)}
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

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[300px] text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-around">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
