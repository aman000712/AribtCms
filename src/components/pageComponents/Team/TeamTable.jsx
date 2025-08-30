import React from "react";
import { FaLinkedin } from "react-icons/fa";

export const TeamRow = ({ teamMember, onActionClick }) => {
  return (
    <tr className="border-b hover:bg-green-50 transition cursor-pointer rounded-lg">
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
      <td className="px-4 py-3">
        <button
          onClick={(e) => onActionClick(e, teamMember.id)}
          className="p-2 rounded-full hover:bg-gray-100 transition text-gray-600"
        >
          ⋮
        </button>
      </td>
    </tr>
  );
};

export const TeamTable = ({ teamMembers, onActionClick }) => (
  <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
    <table className="w-full text-sm text-left text-gray-600">
      <thead className="bg-green-100 text-gray-700 text-sm font-semibold">
        <tr>
          <th className="px-4 py-3">Image</th>
          <th className="px-4 py-3">Name</th>
          <th className="px-4 py-3">Position</th>
          <th className="px-4 py-3">
            <FaLinkedin size={18} className="inline-block" />
          </th>
          <th className="px-4 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {teamMembers.length > 0 ? (
          teamMembers.map((member) => (
            <TeamRow
              key={member.id}
              teamMember={member}
              onActionClick={onActionClick}
            />
          ))
        ) : (
          <tr>
            <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
              No team members found.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

export const TeamHeader = ({ onAddTeam }) => (
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">Team Management</h2>
    <button
      onClick={onAddTeam}
      className="bg-[#166a63] text-white px-5 py-2 rounded-xl hover:bg-[#11534e] shadow-sm transition"
    >
      Add Team Member
    </button>
  </div>
);
