import React from "react";
import palmImage from "../../assets/image15.png";
import "./Preloader.css"; 

function Preloader() {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-white z-[9999]">
      <img src={palmImage} alt="Palmpay Logo" className="preloader-logo" />
    </div>
  );
}

export default Preloader;
