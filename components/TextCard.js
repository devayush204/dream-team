"use client"
import React, { useEffect, useState } from 'react';
import './TextCard.css'; // Import CSS file for styling

const TextCard = ({ label, text, result, onDragStart, onDrop, resetCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (resetCard) {
      setIsFlipped(false); // Reset card to front face
    }
  }, [resetCard]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleDragStart = (e) => {
    onDragStart();
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const result = e.dataTransfer.getData('result');
    onDrop(result);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`text-card ${isFlipped ? 'is-flipped' : ''}`}
      onClick={handleFlip}
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="front shadow-md  bg-zinc-300 rounded-xl">
        <h3 className="text-2xl text-black/80 capitalize font-bold">{label}</h3>
      </div>
      <div className="back shadow-md bg-yellow-300 flex font-bold text-3xl items-center justify-center px-10 rounded-xl">
        <p className=" w-full capitalize text-red-500 ">{text}</p>
          <span className='py-8 rounded-full px-[2px] absolute right-28 bg-black/80' />
          <p className=" text-right text-red-500 w-full">{result}</p>
      </div>
    </div>
  );
};

export default TextCard;
