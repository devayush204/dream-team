"use client"
import  QuestionData  from '@/data/Questions';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import TextCard from './TextCard';
import WinnerModal from './WinnerModal';

const QuestionCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedOptions, setRevealedOptions] = useState(Array(8).fill(false));
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team 1', score: 0 },
    { id: 2, name: 'Team 2', score: 0 },
  ]);
  const [draggedCard, setDraggedCard] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [winnerTeam, setWinnerTeam] = useState(null);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? QuestionData.length - 1 : prevIndex - 1));
    setRevealedOptions(Array(8).fill(false));
    setDraggedCard(null);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === QuestionData.length - 1 ? 0 : prevIndex + 1));
    setRevealedOptions(Array(8).fill(false));
    setDraggedCard(null);

    if ((currentIndex + 1) % 4 === 0) {
      eliminateTeams();
      setCurrentRound((prevRound) => prevRound + 1);
    }

    if (currentIndex === QuestionData.length - 1 && currentRound === 4) {
      const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
      setWinnerTeam(sortedTeams[0]);
      setShowModal(true);
    }
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

  const handleCardDrop = (teamId) => {
    if (draggedCard) {
      setTeams((prevTeams) =>
        prevTeams.map((team) =>
          team.id === teamId ? { ...team, score: team.score + draggedCard.result } : team
        )
      );
      setDraggedCard(null);
    }
  };

  const eliminateTeams = () => {
    setTeams((prevTeams) => [
      { ...prevTeams[0], name: `Team 1 (Round ${currentRound})`, score: 0 },
      { ...prevTeams[1], name: `Team 2 (Round ${currentRound})`, score: 0 },
    ]);
  };

  const currentQuestion = QuestionData[currentIndex];

  return (
    <div className="flex">
      <Sidebar teams={teams} onDrop={handleCardDrop} setTeams={setTeams} />
      <div className="w-[70vw] py-8 px-20">
        <h1 className="text-3xl font-bold mb-6">
          {currentQuestion.question} (Round {currentRound})
        </h1>
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
      {showModal && <WinnerModal winnerTeam={winnerTeam} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default QuestionCarousel;