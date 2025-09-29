import React, { useRef, useState } from "react";
import { Camera } from "lucide-react"; // camera icon

function ProfilePictureUpload({ initialImage, onImageChange }) {
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(initialImage || null);

  // Handle upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onImageChange(reader.result); // pass back to parent (e.g., Dashboard / Signup)
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-24 h-24">
      {/* Profile Pic */}
      <img
        src={preview || "https://via.placeholder.com/150"}
        alt="Profile"
        className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 cursor-pointer"
        onClick={() => fileInputRef.current.click()}
      />

      {/* Camera Button Overlay */}
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="absolute bottom-0 right-0 bg-purple-600 p-2 rounded-full text-white shadow-md"
      >
        <Camera className="w-4 h-4" />
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}

export default ProfilePictureUpload;
