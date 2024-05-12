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
      prevTeams.map((team) => {
        if (team.id === teamId) {
          if (team.name !== newTeamName) {
            return { ...team, name: newTeamName, score: 0 }; // Reset the score to zero if name changes
          } else {
            return { ...team, name: newTeamName };
          }
        } else {
          return team;
        }
      })
    );
    setEditingTeamId(null);
    setNewTeamName('');
  };

  return (
    <div className="w-[20vw]">
      <div className="flex flex-col justify-center h-[100vh]">
        {teams.map((team, index) => (
          <div
            key={team.id}
            className={`flex-1 p-5 relative ${index % 2 === 0 ? 'bg-gradient-to-r from-pink-500 to-yellow-500' : 'bg-gradient-to-r from-green-500 to-blue-500'}`}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(team.id)}
          >
            {editingTeamId === team.id ? (
              <input
                type="text"
                value={newTeamName}
                onChange={handleTeamNameChange}
                className="w-full outline-none ps-5 py-2 rounded-xl"
                placeholder='Team Name'
              />
            ) : (
              <h2 className="text-3xl text-center capitalize font-bold mb-2">{team.name}</h2>
            )}
            <p className='text-6xl text-black font-bold text-center mt-5'>{team.score}</p>
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
