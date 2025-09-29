import React, { useState, useEffect } from "react";
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
  const [showBalance, setShowBalance] = useState(true);
  const [user, setUser] = useState(null);
  const [network, setNetwork] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Text slider state
  const ads = [
    "🎯 Bet on your favorite sports now with Bet9ja! Win big today!",
    "₿ Buy and sell Bitcoin easily on Luno. Start trading now!",
    "⚡ Fast transactions with PulsePay. Send money instantly!",
    "💰 Take a loan quickly and repay at your convenience!"
  ];
  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      if (storedUser.phone) setNetwork(detectNetwork(storedUser.phone));
    }

    const interval = setInterval(() => {
      setCurrentAd(prev => (prev + 1) % ads.length);
    }, 4000); // change ad every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const detectNetwork = (phone) => {
    if (!phone) return "";
    const prefix = phone.slice(0, 4);
    if (/^(0803|0806|0703|0706|0813|0816|0810|0814|0903|0906)$/.test(prefix)) return "MTN";
    if (/^(0805|0807|0811|0815|0905|0915)$/.test(prefix)) return "GLO";
    if (/^(0802|0808|0708|0701|0812|0902|0907|0912)$/.test(prefix)) return "Airtel";
    if (/^(0809|0817|0818|0909|0908)$/.test(prefix)) return "9mobile";
    return "";
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
    <div className="bg-gray-100 min-h-screen p-4">
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

        <div className="flex items-center gap-3">
          <img src={customerImage} alt="" className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer" />
          <img src={codeImage} alt="" className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer" />
          <img src={notificationImage} alt="" className="w-6 h-6 sm:w-7 sm:h-7 cursor-pointer" />
        </div>
      </div>

      {/* Logout Confirmation Modal */}
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

      {/* Text Ads Slider */}
      <div className="mb-6 p-4 bg-purple-500 rounded-xl text-white font-semibold text-center shadow-md">
        {ads[currentAd]}
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-3 gap-4 bg-white rounded-xl p-4 mb-16">
        {actions.map((action, index) => (
          <div
            key={index}
            onClick={() => setPage(action.page)}
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

      {/* Bottom Nav */}
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
