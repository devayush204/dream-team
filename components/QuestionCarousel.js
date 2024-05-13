"use client"
import QuestionData from '@/data/Questions';
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import TextCard from './TextCard';
import WinnerModal from './WinnerModal';
import Navbar from './Navbar';

const QuestionCarousel = () => {
  const congratsAudio = "/congratulations.mp3"
  const congratsSound = new Audio(congratsAudio);
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
  const [droppedTeams, setDroppedTeams] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    // Reset the card to front face when currentIndex or currentRound changes
    setResetCard(false);
  }, [currentIndex, currentRound]);

  // Function to start the game
  const startGame = () => {
    setGameStarted(true);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? QuestionData.length - 1 : prevIndex - 1));
    setRevealedAnswers(Array(8).fill(false));
    setDraggedCard(null);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === QuestionData.length - 1 ? 0 : prevIndex + 1));
    setDraggedCard(null);

    // Set revealed answers to null after a delay
    setRevealedAnswers(Array(8).fill(null));
    setTimeout(() => {
      setRevealedAnswers(Array(8).fill(false));
    }, 3000);

    // Check for the end of each round
    if (currentIndex + 1 === 5 && currentRound === 1) { // End of first round
      setCurrentRound(2);
    } else if (currentIndex + 1 === 9 && currentRound === 2) { // End of second round
      setCurrentRound(3);
    }

    if (currentIndex === QuestionData.length - 1 && currentRound === 3) {
      const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
      setWinnerTeam(sortedTeams[0]);
      setShowModal(true);
      congratsSound.play()
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

      // Add dropped team to the droppedTeams state with score
      const droppedTeam = teams.find((team) => team.id === teamId);
      setDroppedTeams((prevDroppedTeams) => [...prevDroppedTeams, { ...droppedTeam }]);
    }
  };

  const handleRemoveDroppedTeam = (teamId) => {
    setDroppedTeams((prevDroppedTeams) =>
      prevDroppedTeams.filter((team) => team.id !== teamId)
    );
  };

  const currentQuestion = QuestionData[currentIndex];

  return (
    <div className="flex">
      <Sidebar
        teams={teams}
        droppedTeams={droppedTeams}
        onDrop={handleCardDrop}
        setTeams={setTeams}
        onRemove={handleRemoveDroppedTeam}
        scores={teams} // Pass teams as scores to dynamically fetch scores in Sidebar
      />
      {!gameStarted && ( // Render instructions and start button if the game hasn't started
        <div className="w-full mt-20 flex flex-col text-center ml-20 ">
          <h2 className="text-2xl font-bold mb-4">Instructions:</h2>
          <p className="mb-4">Follow the instructions and answer the questions correctly to earn points.</p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={startGame}
          >
            Start the Game
          </button>
        </div>
      )}
      {gameStarted && (
        <>
          <div className='relative'>
            <Navbar
              currentRound={currentRound}
              setCurrentRound={setCurrentRound}
              setCurrentIndex={setCurrentIndex}
              setResetCard={setResetCard}
            />
            <div className="w-[60vw] ml-24 py-8 px-20 mt-16 flex flex-col ">
              <h1 className="text-3xl font-bold mb-6 ">
                {currentQuestion.question}
              </h1>
              <div className="grid grid-cols-2 gap-4 mb-6 w-full">
                {['Answer1', 'Answer2', 'Answer3', 'Answer4', 'Answer5', 'Answer6', 'Answer7', 'Answer8'].map((label, index) => (
                  <div key={index}>
                    <TextCard
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
              <div className="flex justify-between mb-6">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                  onClick={handlePrevious}
                >
                  Previous
                </button>
                {currentIndex === QuestionData.length - 1 && currentRound === 3 ? (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleNext}
                  >
                    Finish Game
                  </button>
                ) : (
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {showModal && <WinnerModal winnerTeam={winnerTeam} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default QuestionCarousel;
