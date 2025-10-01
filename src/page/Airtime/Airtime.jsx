import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import mtnLogo from "../../assets/mtn.png";
import gloLogo from "../../assets/glo.png";
import airtelLogo from "../../assets/airtel.png";
import mobileLogo from "../../assets/9mobile.png";

// Online logos
const logos = {
  MTN: mtnLogo,
  GLO: gloLogo,
  Airtel: airtelLogo,
  "9mobile": mobileLogo,
};

const networks = ["MTN", "GLO", "Airtel", "9mobile"];

function Airtime() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [network, setNetwork] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Auto-detect network from phone
  useEffect(() => {
    let normalized = phone.startsWith("+234")
      ? "0" + phone.slice(4)
      : phone;

    if (normalized.length >= 4) {
      const prefix = normalized.slice(0, 4);
      if (/^(0803|0806|0703|0706|0813|0816|0810|0814|0903|0906|0913)$/.test(prefix))
        setNetwork("MTN");
      else if (/^(0805|0807|0811|0815|0905|0915)$/.test(prefix))
        setNetwork("GLO");
      else if (/^(0802|0808|0708|0701|0812|0902|0907|0912)$/.test(prefix))
        setNetwork("Airtel");
      else if (/^(0809|0817|0818|0909|0908)$/.test(prefix))
        setNetwork("9mobile");
      else setNetwork("");
    } else {
      setNetwork("");
    }
  }, [phone]);

  const handleRecharge = () => {
    if (!phone || phone.length < 11) return alert("Enter a valid phone number");
    if (!amount || parseInt(amount) <= 0) return alert("Enter a valid amount");
    if (!network) return alert("Invalid network");

    setSuccess(`✅ ${phone} has been recharged with ₦${amount} on ${network}`);
    setPhone("");
    setAmount("");
    setNetwork("");

    // Hide success message after 3s
    setTimeout(() => setSuccess(""), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Airtime Recharge</h2>

      {/* Network Selection */}
      <div className="flex gap-4 mb-4 flex-wrap justify-center">
        {networks.map((net) => (
          <div
            key={net}
            onClick={() => setNetwork(net)}
            className={`p-2 rounded-lg border cursor-pointer flex flex-col items-center transition
              ${network === net ? "border-purple-700 bg-purple-50" : "border-gray-200 bg-white"}`}
          >
            <img src={logos[net]} alt={net} className="w-16 h-16 mb-1" />
            <span className="text-sm">{net}</span>
          </div>
        ))}
      </div>

      {/* Phone Input */}
      <input
        type="tel"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full max-w-md p-3 rounded-lg mb-3 border outline-none"
      />

      {/* Amount Input */}
      <input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full max-w-md p-3 rounded-lg mb-4 border outline-none"
      />

      {/* Network Display */}
      {network && (
        <div className="flex items-center gap-2 mb-4 font-medium text-gray-700">
          <img src={logos[network]} alt={network} className="w-6 h-6" /> 
          {network} Network detected
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="mb-4 p-3 w-full max-w-md bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
          {success}
        </div>
      )}

      {/* Recharge Button */}
      <button
        onClick={handleRecharge}
        disabled={!phone || !amount || !network}
        className={`w-full max-w-md py-3 rounded-lg font-semibold text-white transition cursor-pointer ${
          phone && amount && network
            ? "bg-purple-700 hover:bg-purple-800"
            : "bg-gray-300 cursor-not-allowed"
        }`}
      >
        Recharge
      </button>

      {/* Back Button */}
      <button
        onClick={() => navigate("/dashboard")}
        className="w-full max-w-md py-3 mt-3 rounded-lg border border-purple-700 text-purple-700 font-semibold hover:bg-purple-50 transition cursor-pointer"
      >
        Back to Dashboard
      </button>
    </div>
  );
}

export default Airtime;
