import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioSearch from "../pageComponents/Portfolio/PortfolioSearch";
import PortfolioPagination from "../pageComponents/Portfolio/PortfolioPagination";
import { DropdownMenu, PortfolioTable, PortfolioHeader } from "../pageComponents/Portfolio/PortfolioTable";

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionOpen, setActionOpen] = useState(null);
  const [triggerRect, setTriggerRect] = useState(null);

  const navigate = useNavigate();
  const PAGE_SIZE = 5;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("portfolio"));
    if (stored && Array.isArray(stored)) {
      setPortfolio(stored);
    } else {
      const defaults = [
        {
          id: 1,
          title: "Restaurant Website (Japan)",
          description: "Custom restaurant website with menu and reservation system.",
          category: "Web Design",
          year: 2023,
          image: "https://via.placeholder.com/80x80.png?text=Restaurant",
        },
        {
          id: 2,
          title: "Corporate Landing Page",
          description: "Professional landing page for a corporate business.",
          category: "UI/UX",
          year: 2024,
          image: "https://via.placeholder.com/80x80.png?text=Corporate",
        },
      ];
      setPortfolio(defaults);
      localStorage.setItem("portfolio", JSON.stringify(defaults));
    }
  }, []);

  const filteredPortfolio = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return portfolio;
    return portfolio.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
    );
  }, [portfolio, search]);

  const totalPages = Math.ceil(filteredPortfolio.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedPortfolio = filteredPortfolio.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  const savePortfolio = (updatedPortfolio) => {
    setPortfolio(updatedPortfolio);
    localStorage.setItem("portfolio", JSON.stringify(updatedPortfolio));
  };

  const handleAddPortfolio = () => navigate("/addportfolio");
  const handleEditPortfolio = (item) => navigate("/addportfolio", { state: { item } });
  const handleDeletePortfolio = (id) => {
    const updated = portfolio.filter((p) => p.id !== id);
    savePortfolio(updated);
    setActionOpen(null);
  };

  const handleActionClick = (e, id) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    setTriggerRect(rect);
    setActionOpen(actionOpen === id ? null : id);
  };

  useEffect(() => {
    const handleClick = () => actionOpen && setActionOpen(null);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [actionOpen]);

  const handleRowClick = (item) => handleEditPortfolio(item);

  return (
    <div className="p-6 max-w-7xl mx-auto py-14">
      <PortfolioHeader onAddPortfolio={handleAddPortfolio} />

      <PortfolioSearch search={search} onSearchChange={setSearch} />

      <PortfolioTable
        portfolio={paginatedPortfolio}
        onEdit={handleEditPortfolio}
        onDelete={handleDeletePortfolio}
        onActionClick={handleActionClick}
        onRowClick={handleRowClick} 
      />

      <PortfolioPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {actionOpen && (
        <DropdownMenu
          item={portfolio.find((p) => p.id === actionOpen)}
          isOpen={true}
          onClose={() => setActionOpen(null)}
          onEdit={handleEditPortfolio}
          onDelete={handleDeletePortfolio}
          triggerRect={triggerRect}
        />
      )}
    </div>
  );
};

export default Portfolio;
