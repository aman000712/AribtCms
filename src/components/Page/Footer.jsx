// FooterManager.jsx
import React, { useState } from "react";
import SocialLinks from "../pageComponents/Footer/SocialLinks";
import LogoManager from "../pageComponents/Footer/LogoManager";

const Footer = () => {
  const [activeTab, setActiveTab] = useState("social");

  return (
    <div className="py-12 px-4 max-w-2xl mx-auto  rounded-xl shadow-sm ">
      <h1 className="text-2xl font-bold text-center mb-4">Footer Manager</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-4 border-b">
        <button
          onClick={() => setActiveTab("social")}
          className={`px-3 py-1 text-sm font-semibold rounded-t-lg transition ${
            activeTab === "social"
              ? "border-b-2 border-green-700 text-green-700 bg-white"
              : "text-gray-600 hover:bg-green-200"
          }`}
        >
          Social Links
        </button>
        <button
          onClick={() => setActiveTab("logo")}
          className={`px-3 py-1 text-sm font-semibold rounded-t-lg transition ${
            activeTab === "logo"
              ? "border-b-2 border-green-700 text-green-700 bg-white"
              : "text-gray-600 hover:bg-green-200"
          }`}
        >
          Logo Manager
        </button>
      </div>

      {/* Active Tab Content */}
      <div className="space-y-4">
        {activeTab === "social" && <SocialLinks />}
        {activeTab === "logo" && <LogoManager />}
      </div>
    </div>
  );
};

export default Footer;
