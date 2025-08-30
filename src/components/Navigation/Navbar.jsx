import React from "react";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="h-16 bg-white flex items-center justify-between px-6 fixed top-0 left-64 right-0 z-10">
      <div></div>

      <div className="flex items-center gap-4 ml-6">
        <User className="w-6 h-6 text-[#166a63] hover:text-green-800 cursor-pointer" />
      </div>
    </div>
  );
};

export default Navbar;
