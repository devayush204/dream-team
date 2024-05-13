import React from 'react';

const WinnerModal = ({ winnerTeam, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-green-300 h-[70vh] w-[80vw] flex items-center justify-center flex-col p-8 rounded-md">
        <h2 className="text-3xl font-bold mb-4">Winner Announcement</h2>
        <p className="text-lg mb-6">The winner of the quiz competition is:</p>
        <h3 className="text-5xl font-bold mb-8">{winnerTeam.name}</h3>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default WinnerModal;