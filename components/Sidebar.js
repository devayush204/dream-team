import React from 'react';

const Sidebar = ({ teams, onDrop }) => {
  return (
    <div className='w-[30vw] bg-zinc-200'>
      <div className='flex flex-col justify-center h-[100vh] bg-pink-300'>
        {teams.map((team) => (
          <div
            key={team.id}
            className='flex-1 p-3 border '
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(team.id)}
          >
            <h2 className='text-xl font-bold mb-2'>{team.name}</h2>
            <p>Total Score: {team.score}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;