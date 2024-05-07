import React from 'react';

const Sidebar = ({ team1Result, team2Result, onDrop }) => {
  return (
    <div className='w-[30vw] bg-zinc-200'>
      <div className='flex flex-col gap-10 h-[100vh] bg-pink-300'>
        <div
          className='flex-1 p-5'
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop('team1')}
        >
          <h2 className='text-xl font-bold mb-2'>Team 1</h2>
          <p>Total Score: {team1Result}</p>
        </div>
        <div
          className='flex-1 p-5'
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop('team2')}
        >
          <h2 className='text-xl font-bold mb-2'>Team 2</h2>
          <p>Total Score: {team2Result}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;