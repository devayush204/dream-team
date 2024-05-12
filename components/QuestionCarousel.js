"use client"
import QuestionData from '@/data/Questions';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import TextCard from './TextCard';
import WinnerModal from './WinnerModal';
import Navbar from './Navbar';

const QuestionCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealedAnswers, setRevealedAnswers] = useState(Array(8).fill(false));
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team 1', score: 0 },
    { id: 2, name: 'Team 2', score: 0 },
  ]);
  const [draggedCard, setDraggedCard] = useState(null);
  const [currentRound, setCurrentRound] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [winnerTeam, setWinnerTeam] = useState(null);
  const [resetCard, setResetCard] = useState(false); // State to track card reset

  useEffect(() => {
    // Reset the card to front face when currentIndex or currentRound changes
    setResetCard(false);
  }, [currentIndex, currentRound]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === QuestionData.length - 1 ? 0 : prevIndex - 1));
    setRevealedAnswers(Array(8).fill(false));
    setDraggedCard(null);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === QuestionData.length - 1 ? 0 : prevIndex + 1));
    setRevealedAnswers(Array(8).fill(false));
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

    // Set resetCard to true to reset the card to front face
    setResetCard(true);
  };

  const handleAnswerReveal = (index) => {
    setRevealedAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = !updatedAnswers[index];
      return updatedAnswers;
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
    <div className="flex ">
      <Sidebar teams={teams} onDrop={handleCardDrop} setTeams={setTeams} />
      <div className='relative'>
        <Navbar
          currentRound={currentRound}
          setCurrentRound={setCurrentRound}
          setCurrentIndex={setCurrentIndex}
        />
        <div className="w-[70vw] ml-24 py-8 px-20 mt-16 flex flex-col ">
          <h1 className="text-3xl font-bold mb-6 ">
            {currentQuestion.question}  (Round {currentRound})
          </h1>
          <div className="grid grid-cols-2 gap-4 mb-6 w-full">
            {['Answer1', 'Answer2', 'Answer3', 'Answer4', 'Answer5', 'Answer6', 'Answer7', 'Answer8'].map((label, index) => (
              <div>
                <TextCard
                  key={index}
                  label={label}
                  text={currentQuestion[label.toLowerCase()]}
                  result={currentQuestion.result[index]}
                  isOpen={revealedAnswers[index]}
                  onReveal={() => handleAnswerReveal(index)}
                  onDragStart={() => handleCardDragStart(index, currentQuestion.result[index])}
                  resetCard={resetCard} // Pass resetCard state to the TextCard component
                />
              </div>
            ))}
          </div>
          <div className="flex justify-end mb-6">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {showModal && <WinnerModal winnerTeam={winnerTeam} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default QuestionCarousel;
