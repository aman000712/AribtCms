import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { TeamHeader, TeamTable } from "../pageComponents/Team/TeamTable";
import TeamSearch from "../pageComponents/Team/TeamSearch";
import TeamDropdown from "../pageComponents/Team/TeamDropdown";
import TeamPagination from "../pageComponents/Team/TeamPagination";

const Team = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [actionOpen, setActionOpen] = useState(null);
  const [triggerRect, setTriggerRect] = useState(null);

  const navigate = useNavigate();
  const PAGE_SIZE = 8;

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("teamMembers"));
    if (stored && Array.isArray(stored)) setTeamMembers(stored);
    else {
      const defaults = [
        { id: 1, name: "Rahul Ghimire", position: "CEO", image: "/images/team/rahul-ghimire.jpg", linkedin: "https://linkedin.com/in/rahul-ghimire" },
        { id: 2, name: "Kisan Mahat", position: "CTO", image: "/images/team/kisan-mahat.jpg", linkedin: "https://linkedin.com/in/kisan-mahat" },
        { id: 3, name: "Arjun Neupane", position: "Senior Designer", image: "/images/team/arjun-neupane.jpg", linkedin: "https://linkedin.com/in/arjun-neupane" },
      ];
      setTeamMembers(defaults);
      localStorage.setItem("teamMembers", JSON.stringify(defaults));
    }
  }, []);

  const filteredTeamMembers = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return teamMembers;
    return teamMembers.filter(m => m.name.toLowerCase().includes(q) || m.position.toLowerCase().includes(q));
  }, [teamMembers, search]);

  const totalPages = Math.ceil(filteredTeamMembers.length / PAGE_SIZE);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paginatedTeamMembers = filteredTeamMembers.slice(startIndex, startIndex + PAGE_SIZE);

  const saveTeamMembers = (updatedMembers) => {
    setTeamMembers(updatedMembers);
    localStorage.setItem("teamMembers", JSON.stringify(updatedMembers));
  };

  const handleAddTeamMember = () => navigate("/addteam");
  const handleEditTeamMember = (member) => navigate("/addteam", { state: { teamMember: member } });
  const handleDeleteTeamMember = (id) => {
    if (window.confirm("Are you sure you want to delete this team member?")) {
      saveTeamMembers(teamMembers.filter(m => m.id !== id));
      setActionOpen(null);
    }
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

  return (
    <div className="p-6 max-w-7xl mx-auto py-14">
      <TeamHeader onAddTeam={handleAddTeamMember} />
      <TeamSearch search={search} onSearchChange={setSearch} />
      <TeamTable
        teamMembers={paginatedTeamMembers}
        onEdit={handleEditTeamMember}
        onDelete={handleDeleteTeamMember}
        onActionClick={handleActionClick}
      />
      <TeamPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      {actionOpen && (
        <TeamDropdown
          teamMember={teamMembers.find(m => m.id === actionOpen)}
          isOpen={true}
          onClose={() => setActionOpen(null)}
          onEdit={handleEditTeamMember}
          onDelete={handleDeleteTeamMember}
          triggerRect={triggerRect}
        />
      )}
    </div>
  );
};

export default Team;
