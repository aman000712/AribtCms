import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems, logoutItem } from "./NavItems";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-64 flex flex-col bg-white border-r border-gray-100 shadow-sm">
      {/* Header */}
      <div className="px-6 py-5">
        <h1 className="text-xl font-bold text-green-700">ARIBT</h1>
        <p className="text-green-800 text-xs mt-1">Navigation Panel</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;

            return (
              <li key={item.title}>
                <Link
                  to={item.to}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg text-sm transition-all duration-200
                    relative
                    ${
                      isActive
                        ? "bg-green-50 text-green-700 border-l-4 border-green-600 shadow-md"
                        : "text-gray-600 hover:bg-green-50 hover:text-green-700 hover:border-l-4 hover:border-green-600 hover:shadow-md"
                    }
                  `}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-green-600" : "text-gray-500 hover:text-green-600"}
                  />
                  <span className="font-medium">{item.title}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 rounded-full bg-green-500"></div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Section */}
      <div className="px-3 py-4 border-t border-gray-100 mt-auto">
        <button
          className={`
            flex items-center gap-3 w-full p-3 rounded-lg text-sm text-gray-600
            transition-all duration-200
            hover:bg-red-50 hover:text-red-700 hover:border-l-4 hover:border-red-600 hover:shadow-md
            relative
          `}
        >
          {React.createElement(logoutItem.icon, {
            size: 18,
            className: "text-gray-500 hover:text-red-600",
          })}
          <span className="font-medium">{logoutItem.title}</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
