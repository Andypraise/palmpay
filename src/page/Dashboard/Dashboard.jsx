import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";   // ✅ added
import { Eye, EyeOff, Wifi } from "lucide-react";
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
    const navigate = useNavigate(); 
  const [showBalance, setShowBalance] = useState(true);
  const [user, setUser] = useState(null);
  const [network, setNetwork] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // New states for Support, Scanner, Notifications
  const [showSupport, setShowSupport] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Example Notifications
  const notifications = [
    { id: 1, message: "✅ Airtime purchase successful" },
    { id: 2, message: "💰 You received ₦2,000 from John" },
    { id: 3, message: "🎉 Promo: Get 5% bonus on airtime" },
  ];

  // 🔹 Ads with links
  const ads = [
    { text: "🎯 Bet on your favorite sports now with Bet9ja! Win big today!", link: "https://www.bet9ja.com" },
    { text: "₿ Buy and sell Bitcoin easily on Luno. Start trading now!", link: "https://www.luno.com" },
    { text: "⚡ Fast transactions with PulsePay. Send money instantly!", link: "https://www.opayweb.com" },
    { text: "💰 Take a loan quickly and repay at your convenience!", link: "https://www.opayweb.com/loan" }
  ];
  const [currentAd, setCurrentAd] = useState(0);

  // ✅ Detect Network
  const detectNetwork = useCallback((phone) => {
    if (!phone) return "";
    const prefix = phone.slice(0, 4);
    if (/^(0803|0806|0703|0706|0813|0816|0810|0814|0903|0906)$/.test(prefix)) return "MTN";
    if (/^(0805|0807|0811|0815|0905|0915)$/.test(prefix)) return "GLO";
    if (/^(0802|0808|0708|0701|0812|0902|0907|0912)$/.test(prefix)) return "Airtel";
    if (/^(0809|0817|0818|0909|0908)$/.test(prefix)) return "9mobile";
    return "";
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      if (storedUser.phone) setNetwork(detectNetwork(storedUser.phone));
    }

    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % ads.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [ads.length, detectNetwork]);

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
    { name: "Profile", image: user?.profilePic || profileImage, page: "profile" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    setPage("login");
  };

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

  if (!user) return null;

  return (
    <div className="bg-gray-100 min-h-screen p-4 relative">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4 relative">
          <img
            src={user.profilePic || profileImage}
            alt="profile"
            className="w-12 h-12 rounded-full border-2 border-purple-600 cursor-pointer"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />
          <input
            type="file"
            id="profileInput"
            className="hidden"
            accept="image/*"
            onChange={handleProfileChange}
          />
          <div>
            <h1 className="text-[20px] font-semibold">
              Hi, {user.name || user.phone || "User"}
            </h1>
            <p className="text-sm text-gray-600">Welcome back!</p>
          </div>

          {showProfileMenu && (
            <div className="absolute top-14 left-0 bg-white border rounded shadow p-3 w-44 z-50 flex flex-col">
              <button
                onClick={() => {
                  document.getElementById("profileInput").click();
                  setShowProfileMenu(false);
                }}
                className="text-left px-2 py-1 hover:bg-gray-100 rounded"
              >
                Change Profile
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(true);
                  setShowProfileMenu(false);
                }}
                className="text-left px-2 py-1 hover:bg-red-100 rounded text-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 relative">
          {/* Customer Care */}
          <img
            src={customerImage}
            alt="support"
            className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
            onClick={() => setShowSupport(true)}
          />
          {/* QR Scanner */}
          <img
            src={codeImage}
            alt="scanner"
            className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
            onClick={() => setShowScanner(true)}
          />
          {/* Notifications */}
          <img
            src={notificationImage}
            alt="notification"
            className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer"
            onClick={() => setShowNotifications(!showNotifications)}
          />

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute top-10 right-0 bg-white shadow-lg rounded-lg w-72 p-3 z-50">
              <h3 className="font-semibold mb-2">Notifications</h3>
              <ul className="space-y-2">
                {notifications.map((note) => (
                  <li key={note.id} className="text-sm text-gray-700 border-b pb-2">
                    {note.message}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setShowNotifications(false)}
                className="mt-2 bg-gray-200 w-full py-1 rounded"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center gap-4">
            <p className="text-lg font-medium">Are you sure you want to logout?</p>
            <div className="flex gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupport && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-3">Customer Support</h2>
            <p className="text-sm text-gray-600 mb-4">Need help? Contact us:</p>
            <a
              href="https://wa.me/2349133277350"
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-green-600 text-white py-2 rounded mb-2 text-center"
            >
              WhatsApp Chat
            </a>
            <button
              onClick={() => setShowSupport(false)}
              className="bg-gray-300 w-full py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
            <h2 className="text-lg font-semibold mb-3">QR Scanner</h2>
            <p className="text-sm text-gray-600 mb-4">Scanner feature coming soon 📷</p>
            <button
              onClick={() => setShowScanner(false)}
              className="bg-purple-600 text-white w-full py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Balance Card */}
      <div className="bg-gradient-to-r from-purple-700 to-purple-500 text-white rounded-xl p-6 mb-4 shadow-lg">
        <p className="text-sm">Wallet Balance</p>
        <div className="flex justify-between items-center mt-2">
          <h2 className="text-3xl font-bold">{showBalance ? "₦5,450.00" : "******"}</h2>
          <button
            onClick={() => setShowBalance(!showBalance)}
            className="ml-3 p-2 bg-purple-600 rounded-full"
          >
            {showBalance ? <EyeOff className="w-5 h-5 text-white" /> : <Eye className="w-5 h-5 text-white" />}
          </button>
        </div>
      </div>

      {/* Ads Slider */}
      <div className="mb-6 bg-white rounded-xl shadow-md overflow-hidden cursor-pointer">
        <a href={ads[currentAd].link} target="_blank" rel="noopener noreferrer">
          <div
            className="bg-purple-600 text-white py-3 text-center font-semibold transition-all duration-700 ease-in-out"
            key={currentAd}
          >
            {ads[currentAd].text}
          </div>
        </a>
        <div className="flex justify-center gap-2 py-2">
          {ads.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentAd ? "bg-purple-600" : "bg-gray-300"}`}
            ></span>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-4 bg-white rounded-xl p-4 mb-16">
        {actions.map((action, index) => (
          <div
            key={index}
           onClick={() => navigate("/airtime")}
            className="cursor-pointer rounded-xl p-4 flex flex-col items-center hover:bg-purple-50 transition"
          >
            <img src={action.image} alt={action.name} className="w-9 h-9 mb-2" />
            <p className="text-sm font-medium">{action.name}</p>
            {action.name === "Airtime" && network && (
              <div className="mt-2 flex items-center text-xs text-gray-700 gap-1">
                <Wifi size={16} /> {network}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* BoAOttom Nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-md flex justify-around py-2">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => setPage(item.page)}
            className={`flex flex-col items-center text-xs ${currentPage === item.page ? "text-purple-700 font-bold" : "text-gray-600"}`}
          >
            {item.image && <img src={item.image} alt={item.name} className="w-6 h-6 mb-1" />}
            <span>{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
