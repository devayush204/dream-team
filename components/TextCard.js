"use client"
import React, { useEffect, useState } from 'react';
import './TextCard.css';

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

  const words = text.split(' ');
  const textSize = words.length > 2 ? 'text-xl' : 'text-3xl';

  // Split the label to add a space between "answer" and the number
  const [labelPart1, labelPart2] = label.split(/(\d+)/);

  return (
    <div
      className={`text-card ${isFlipped ? 'is-flipped' : ''}`}
      onClick={handleFlip}
      draggable
      onDragStart={handleDragStart}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="front shadow-md bg-zinc-300 rounded-xl">
        <h3 className="text-2xl text-black/80 capitalize font-bold">{`${labelPart1} ${labelPart2}`}</h3>
      </div>
      <div className="back shadow-md bg-yellow-300 flex font-bold items-center justify-center px-10 rounded-xl">
        <p className={`w-full capitalize text-red-500 ${textSize}`}>{text}</p>
        <span className="py-8 rounded-full px-[2px] absolute right-28 bg-black/80" />
        <p className="text-right text-3xl text-red-500 w-full">{result}</p>
      </div>
    </div>
  );
};

export default TextCard;