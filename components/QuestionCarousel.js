"use client"
import { QuestionData } from '@/data/Questions';
import React, { useState } from 'react';
import TextCard from './TextCard';

const QuestionCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedOptions, setRevealedOptions] = useState(Array(8).fill(false));

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? QuestionData.length - 1 : prevIndex - 1));
    setRevealedOptions(Array(8).fill(false)); // Reset revealed options
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === QuestionData.length - 1 ? 0 : prevIndex + 1));
    setRevealedOptions(Array(8).fill(false)); // Reset revealed options
  };

  const handleOptionReveal = (index) => {
    setRevealedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      updatedOptions[index] = !updatedOptions[index];
      return updatedOptions;
    });
  };

  const currentQuestion = QuestionData[currentIndex];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{currentQuestion.question}</h1>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {['option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'option7', 'option8'].map((option, index) => (
          <TextCard
            key={index}
            label={option}
            text={currentQuestion[option]}
            isOpen={revealedOptions[index]}
            onReveal={() => handleOptionReveal(index)}
          />
        ))}
      </div>
      <div className="flex justify-between">
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
  );
};

export default QuestionCarousel;