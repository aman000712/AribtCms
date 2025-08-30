import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Navigation/Sidebar";
import Navbar from "../Navigation/Navbar";

function Layout() {
  return (
    <div className="flex h-screen">
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
        <Navbar />

        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
