"use client"
import React from 'react';

const TextCard = ({ label, text, isOpen, onReveal }) => {
  return (
    <div
      className="p-4 border border-gray-300 rounded-md cursor-pointer"
      onClick={onReveal}
    >
      {!isOpen && <h3 className="text-lg font-semibold mb-2">{label}</h3>}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <p className="text-gray-700">{text}</p>
      </div>
    </div>
  );
};

export default TextCard;