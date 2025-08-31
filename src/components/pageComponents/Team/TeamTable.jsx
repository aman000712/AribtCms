import React from "react";
import { FaLinkedin } from "react-icons/fa";

// Single team row
export const TeamRow = ({ teamMember, index, onActionClick }) => (
  <tr className="border-b hover:bg-green-50 transition relative cursor-pointer">
    <td className="px-4 py-3 font-medium text-gray-700">{index + 1}</td>
    <td className="px-4 py-3">
      <img
        src={teamMember.image}
        alt={teamMember.name}
        className="w-12 h-12 rounded-full object-cover shadow-sm"
      />
    </td>
    <td className="px-4 py-3 font-medium text-gray-800">{teamMember.name}</td>
    <td className="px-4 py-3 text-gray-600">{teamMember.position}</td>
    <td className="px-4 py-3">
      {teamMember.linkedin ? (
        <a
          href={teamMember.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition"
        >
          <FaLinkedin size={20} />
        </a>
      ) : (
        <span className="text-gray-300">N/A</span>
      )}
    </td>
    <td className="px-4 py-3 relative text-right">
      <button
        onClick={(e) => onActionClick(e, teamMember.id)}
        className="p-2 rounded-full hover:bg-green-100 transition text-gray-600"
      >
        ⋮
      </button>
    </td>
  </tr>
);

// Full team table
export const TeamTable = ({ teamMembers, onActionClick }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm mb-4 bg-white">
    <table className="w-full text-sm text-left text-gray-600">
      <thead className="bg-green-200 text-gray-800 text-sm font-semibold">
        <tr>
          <th className="px-4 py-3">Index</th>
          <th className="px-4 py-3">Image</th>
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Position</th>
          <th className="px-4 py-3">
            <FaLinkedin size={18} className="inline-block" />
          </th>
          <th className="px-4 py-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {teamMembers.length > 0 ? (
          teamMembers.map((member, index) => (
            <TeamRow
              key={member.id}
              index={index}
              teamMember={member}
              onActionClick={onActionClick}
            />
          ))
        ) : (
          <tr>
            <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
              No team members found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

// Header for team management
export const TeamHeader = ({ onAddTeam }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Team Management</h2>
    <button
      onClick={onAddTeam}
      className="bg-green-800 text-white px-5 py-2 rounded-xl hover:bg-green-700 shadow-sm transition"
    >
      Add Team Member
    </button>
  </div>
);
