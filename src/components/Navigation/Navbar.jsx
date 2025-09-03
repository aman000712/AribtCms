import React, { useState } from "react";
import { User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage/sessionStorage (if any)
    localStorage.clear();
    sessionStorage.clear();

    // Redirect to login or homepage
    navigate("/login"); // or "/"

    // Close dropdown
    setIsOpen(false);
  };

  return (
    <div className="h-16 bg-white flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10 shadow-sm">
      <div></div>

      {/* User Icon with dropdown */}
      <div className="relative flex items-center gap-4 ml-6">
        <User
          className="w-6 h-6 text-[#166a63] hover:text-green-800 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute right-0 mt-10 w-32 bg-white border border-gray-200 rounded-md shadow-lg py-1">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
