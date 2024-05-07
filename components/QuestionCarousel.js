"use client"
import { QuestionData } from '@/data/Questions';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TextCard from './TextCard';

const QuestionCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedOptions, setRevealedOptions] = useState(Array(8).fill(false));
  const [team1Result, setTeam1Result] = useState(0);
  const [team2Result, setTeam2Result] = useState(0);
  const [draggedCard, setDraggedCard] = useState(null);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? QuestionData.length - 1 : prevIndex - 1));
    setRevealedOptions(Array(8).fill(false));
    setDraggedCard(null);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === QuestionData.length - 1 ? 0 : prevIndex + 1));
    setRevealedOptions(Array(8).fill(false));
    setDraggedCard(null);
  };

  const handleOptionReveal = (index) => {
    setRevealedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = !updatedOptions[index];
      return updatedOptions;
    });
  };

  const handleCardDragStart = (index, result) => {
    setDraggedCard({ index, result });
  };

  const handleCardDrop = (team) => {
    if (draggedCard) {
      if (team === 'team1') {
        setTeam1Result((prevResult) => prevResult + draggedCard.result);
      } else {
        setTeam2Result((prevResult) => prevResult + draggedCard.result);
      }
      setDraggedCard(null);
    }
  };

  const currentQuestion = QuestionData[currentIndex];

  return (
    <div className="flex">
        <Sidebar
        team1Result={team1Result}
        team2Result={team2Result}
        onDrop={handleCardDrop}
      />
      <div className="container mx-auto py-8 px-20">
        <h1 className="text-3xl font-bold mb-6">{currentQuestion.question}</h1>
        <div className="grid grid-cols-2 gap-4 mb-6 w-full">
          {['option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'option7', 'option8'].map((option, index) => (
            <TextCard
              key={index}
              label={option}
              text={currentQuestion[option]}
              result={currentQuestion.result[index]}
              isOpen={revealedOptions[index]}
              onReveal={() => handleOptionReveal(index)}
              onDragStart={() => handleCardDragStart(index, currentQuestion.result[index])}
            />
          ))}
        </div>
        <div className="flex justify-between mb-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handlePrevious}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default QuestionCarousel;