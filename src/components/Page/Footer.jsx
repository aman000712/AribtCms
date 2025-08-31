// FooterManager.jsx
import React, { useState } from "react";
import SocialLinksComponent from "../pageComponents/Footer/SocialLinks";
import QuickLinksComponent from "../pageComponents/Footer/QuickLinks";
import NewsletterComponent from "../pageComponents/Footer/Newsletter";

const Footer = () => {
  const [activeTab, setActiveTab] = useState("social");

  return (
    <div className="py-12 max-w-4xl mx-auto bg-green-100 rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold text-center mb-6">Footer Manager</h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab("social")}
          className={`px-4 py-2 font-semibold rounded-t-lg ${
            activeTab === "social"
              ? "border-b-2 border-green-700 text-green-700 bg-white"
              : "text-gray-600 hover:bg-green-100"
          }`}
        >
          Social Links
        </button>
        <button
          onClick={() => setActiveTab("quick")}
          className={`px-4 py-2 font-semibold rounded-t-lg ${
            activeTab === "quick"
              ? "border-b-2 border-yellow-700 text-yellow-700 bg-white"
              : "text-gray-600 hover:bg-green-100"
          }`}
        >
          Quick Links
        </button>
        <button
          onClick={() => setActiveTab("newsletter")}
          className={`px-4 py-2 font-semibold rounded-t-lg ${
            activeTab === "newsletter"
              ? "border-b-2 border-purple-700 text-purple-700 bg-white"
              : "text-gray-600 hover:bg-green-100"
          }`}
        >
          Newsletter
        </button>
      </div>

      {/* Active Tab Content */}
      <div className="space-y-6">
        {activeTab === "social" && <SocialLinksComponent />}
        {activeTab === "quick" && <QuickLinksComponent />}
        {activeTab === "newsletter" && <NewsletterComponent />}
      </div>
    </div>
  );
};

export default Footer;
