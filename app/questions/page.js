"use client"
import React, { useState } from 'react'
import questionsData from "../../data/Questions"
import QuestionCarousel from '@/components/QuestionCarousel'

const page = () => {
  const [questionsdata, setQuestionsdata] = useState(questionsData)
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showIncorrectModal, setShowIncorrectModal] = useState(false);
  const [droppedTeams, setDroppedTeams] = useState([]);

  const handleCorrectGuess = () => {
    setShowCorrectModal(true);
    setTimeout(() => setShowCorrectModal(false), 2000);
  };

  const handleIncorrectGuess = () => {
    setShowIncorrectModal(true);
    setTimeout(() => setShowIncorrectModal(false), 2000);
  };

  

  const handleRemoveDroppedTeam = (teamId) => {
    setDroppedTeams((prevDroppedTeams) =>
      prevDroppedTeams.filter((team) => team.id !== teamId)
    );
  };
  return (
    <section className='flex'>
      <div className=''>
        <QuestionCarousel />
        <div className='absolute right-0 bottom-0'>
          <button
            className="p-3 mb-5  bg-green-500 text-white rounded mr-5"
            onClick={handleCorrectGuess}
          ></button>

          <button
            className="p-3 bg-red-500 text-white rounded mr-7"
            onClick={handleIncorrectGuess}
          ></button>
          {showCorrectModal && (
            <div className=" relative inset-0 flex items-center justify-center z-50 animated fadeIn w-[100vw] h-[100vw] bg-black/80 ">
              <div className="bg-green-500 text-white p-8 rounded-md shadow-lg absolute top-[70%]">
                <h2 className="text-2xl font-bold mb-4">Correct!</h2>
                <p>You guessed the correct answer.</p>
              </div>
            </div>
          )}
          {showIncorrectModal && (
            <div className="relative inset-0 flex items-center justify-center z-50 animated fadeIn w-[100vw] h-[100vh] bg-black/80 ">
              <div className="bg-red-500 text-white p-8 rounded-md shadow-lg absolute top-[40%]">
                <h2 className="text-2xl font-bold mb-4">Incorrect</h2>
                <p>Oops, you guessed the wrong answer.</p>
              </div>
            </div>
          )}
        </div>
           
        </div>
    </section>
  )
}

export default page