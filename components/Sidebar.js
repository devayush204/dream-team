"use client"
import React, { useState } from 'react';

const Sidebar = ({ teams, onDrop, setTeams }) => {
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [newTeamName, setNewTeamName] = useState('');

  const handleEditClick = (teamId, teamName) => {
    setEditingTeamId(teamId);
    setNewTeamName(teamName);
  };

  const handleTeamNameChange = (event) => {
    setNewTeamName(event.target.value);
  };

  const handleSaveTeamName = (teamId) => {
    setTeams((prevTeams) =>
      prevTeams.map((team) =>
        team.id === teamId ? { ...team, name: newTeamName } : team
      )
    );
    setEditingTeamId(null);
    setNewTeamName('');
  };

  return (
    <div className="w-[30vw] bg-zinc-200">
      <div className="flex flex-col justify-center h-[100vh] bg-pink-300">
        {teams.map((team) => (
          <div
            key={team.id}
            className="flex-1 p-3 border relative"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(team.id)}
          >
            {editingTeamId === team.id ? (
              <input
                type="text"
                value={newTeamName}
                onChange={handleTeamNameChange}
                className="w-[50%] outline-none ps-5 py-2 rounded-xl "
              />
            ) : (
              <h2 className="text-xl font-bold mb-2">{team.name}</h2>
            )}
            <p>Total Score: {team.score}</p>
            {editingTeamId !== team.id && (
              <button
                className="absolute bottom-2 right-2 bg-blue-500 text-sm text-white px-2 py-1 rounded"
                onClick={() => handleEditClick(team.id, team.name)}
              >
                Edit
              </button>
            )}
            {editingTeamId === team.id && (
              <button
                className="absolute bottom-2 right-2 bg-green-500 text-sm text-white px-2 py-1 rounded"
                onClick={() => handleSaveTeamName(team.id)}
              >
                Save
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;