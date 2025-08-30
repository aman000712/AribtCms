import React from "react";
import { Link } from "react-router-dom";
import { navItems, logoutItem } from "./NavItems";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 flex flex-col text-[#166a63] font-semibold bg-green-50">
     
      <div className="px-6 py-4 text-xl font-bold border-b border-gray-300">
        ARIBT
      </div>

     
      <nav className="flex-1 px-4 py-6 overflow-y-auto scroll-smooth">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.title}>
                <Link
                  to={item.to}
                  className="flex items-center gap-2 p-2 rounded-md text-sm hover:text-white hover:bg-gray-700"
                >
                  <Icon size={18} /> <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

     
      <div className="px-4 py-4 border-t border-gray-300">
        <button className="flex items-center gap-2 w-full p-2 rounded-md text-sm hover:bg-red-600">
          {React.createElement(logoutItem.icon, { size: 18 })} {logoutItem.title}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
