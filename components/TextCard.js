"use client"
import React, { useState } from 'react';
import './TextCard.css'; // Import CSS file for styling

const TextCard = ({ label, text, result, onDragStart }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDragStart = (e) => {
    onDragStart();
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`text-card ${isFlipped ? 'is-flipped' : ''}`}
      onClick={handleFlip}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="front  bg-zinc-500">
        <h3 className="text-2xl text-black/80 capitalize font-bold">{label}</h3>
      </div>
      <div className="back bg-black/30 flex font-bold text-3xl items-center justify-center  ">
        <p className="text-black  capitalize  ">{text}</p>
          <span className='py-8 rounded-full px-[2px]  bg-black' />
          <p className="text-black">{result}</p>
      </div>
    </div>
  );
};

export default TextCard;
