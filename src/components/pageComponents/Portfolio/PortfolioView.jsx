import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PortfolioView = () => {
  const { id } = useParams();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("portfolio")) || [];
    const found = saved.find((item) => item.id.toString() === id);
    setPortfolio(found);
  }, [id]);

  if (!portfolio) {
    return (
      <div className="p-6 min-h-screen flex flex-col items-center justify-center">
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-green-600 hover:underline mb-4"
        >
          <ArrowLeft size={18} /> Back to Portfolio
        </Link>
        <p className="text-gray-500 text-center">Portfolio not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto py-12">
      <Link
        to="/portfolio"
        className="inline-flex items-center gap-2 text-green-600 hover:underline mb-6"
      >
        <ArrowLeft size={18} /> Back
      </Link>

      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          {portfolio.image ? (
            <img
              src={portfolio.image}
              alt={portfolio.title}
              className="w-64 h-64 object-cover rounded-lg"
            />
          ) : (
            <div className="w-64 h-64 bg-gray-200 flex items-center justify-center rounded-lg text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2">{portfolio.title}</h2>
          <p className="text-gray-500 mb-4">Year: {portfolio.year}</p>
          <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: portfolio.description }}
          />
        </div>
      </div>
    </div>
  );
};

export default PortfolioView;
