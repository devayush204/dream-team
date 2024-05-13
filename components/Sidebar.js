"use client"
import React, { useState } from 'react';

const Sidebar = ({ teams, onDrop, setTeams, onRemove, scores }) => {
  const [editingTeamId, setEditingTeamId] = useState(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [droppedTeams, setDroppedTeams] = useState([]);

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };


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

  const handleRemoveTeam = (teamId) => {
    setDroppedTeams((prevTeams) => prevTeams.filter((team) => team.id !== teamId));
    onRemove(teamId); // Notify parent component about the removed team
  };

  const handleDragStart = (teamId, teamName, event) => {
    event.dataTransfer.setData('teamId', teamId);
    event.dataTransfer.setData('teamName', teamName);
  };
  const handleDrop = (event) => {
    const teamId = generateUniqueId(); // Generate unique ID for dropped team
    const teamName = event.dataTransfer.getData('teamName');
    if (teamName) {
      const score = scores.find((team) => team.name === teamName)?.score || 0; // Fetch score dynamically
      setDroppedTeams((prevTeams) => [...prevTeams, { id: teamId, name: teamName, score }]);
      onDrop(teamId); // Notify parent component about the dropped team
    }
  };

  const wordsToRemove = ['Round 1', 'Round 2', 'Round 3'];

  return (
    <div className="w-[30vw] flex flex-row">
      <div className="flex flex-col justify-center h-[100vh] w-[60%]">
        {teams.map((team, index) => (
          <div
            key={team.id}
            draggable
            onDragStart={(e) => handleDragStart(team.id, team.name, e)}
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
      <div
        className="h-full bg-zinc-300 border flex flex-col border-gray-400 gap-1 p-2   w-[40%]"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {droppedTeams.map((team) => (
          <div key={team.id} className="relative  flex justify-between items-center p-3 bg-blue-300 rounded-xl">
            <div className='flex flex-col items-center justify-center w-full' >
              <p className='py-4 px-6 text-center rounded-full text-4xl text-black bg-green-200 font-bold'>{team.score}</p>
              <p>{team.name.replace(new RegExp(wordsToRemove.join('|'), 'gi'), '')}</p>
              <button className='absolute right-5 top-2' onClick={() => handleRemoveTeam(team.id)}>X</button>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default Sidebar;
