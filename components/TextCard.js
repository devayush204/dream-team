"use client"
import React from 'react';

const TextCard = ({ label, text, result, isOpen, onReveal, onDragStart }) => {
  const handleDragStart = (e) => {
    onDragStart();
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="p-4 border border-gray-300 rounded-md cursor-pointer"
      onClick={onReveal}
      draggable
      onDragStart={handleDragStart}
    >
      {!isOpen && <h3 className="text-lg text-gray-400 font-bold mb-2">{label}</h3>}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="text-black text-2xl font-semibold capitalize mb-2">{text}</p>
        {isOpen && <p className="text-gray-600">Result: {result}</p>}
      </div>
    </div>
  );
};

export default TextCard;