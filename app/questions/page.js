"use client"
import React, { useState } from 'react'
import questionsData from "../../data/Questions"
import QuestionCarousel from '@/components/QuestionCarousel'

const page = () => {
  const [questionsdata, setQuestionsdata] = useState(questionsData)
  const [showCorrectModal, setShowCorrectModal] = useState(false);
  const [showIncorrectModal, setShowIncorrectModal] = useState(false);
  const [droppedTeams, setDroppedTeams] = useState([]); 

  
const correctSound = "/correct.mp3";
const wrongSound = "/wrong.mp3";
  
  // Audio elements for correct and incorrect sounds
  const correctAudio = new Audio(correctSound);
  const incorrectAudio = new Audio(wrongSound);


  const handleCorrectGuess = () => {
    setShowCorrectModal(true);
    correctAudio.play();
    setTimeout(() => setShowCorrectModal(false), 1000);
  };

  const handleIncorrectGuess = () => {
    setShowIncorrectModal(true);
    incorrectAudio.play();
    setTimeout(() => setShowIncorrectModal(false), 1000);
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
            <div className='relative w-[100vw] h-[100vh] flex justify-center items-center bg-black/80 animated fadeIn z-50 '>
              <div className='bg-green-500 text-white rounded-lg shadow-xl items-center justify-center gap-10  flex flex-col  w-[90%] h-[90%] '>
                <svg className='fill-white font-extrabold w-[400px]' version="1.1"
                  viewBox="0 0 512 512" enable-background="new 0 0 512 512" >
                  <polygon points="437.3,30 202.7,339.3 64,200.7 0,264.7 213.3,478 512,94 " />
                </svg>
                <p className='text-3xl text-white font-bold'>You Guessed the Correct Answer</p>
              </div>
            </div>
          )}
          {showIncorrectModal && (

            <div className='relative w-[100vw] h-[100vh] flex justify-center items-center bg-black/80 animated fadeIn z-50 '>
              <div className='bg-red-500 text-white rounded-lg shadow-xl items-center justify-center gap-10  flex flex-col  w-[90%] h-[90%] '>
                <svg className='fill-white font-extrabold w-[400px]' viewBox="0 0 15 15" version="1.1" >
                  <path d="M2.64,1.27L7.5,6.13l4.84-4.84C12.5114,1.1076,12.7497,1.0029,13,1c0.5523,0,1,0.4477,1,1&#xA;&#x9;c0.0047,0.2478-0.093,0.4866-0.27,0.66L8.84,7.5l4.89,4.89c0.1648,0.1612,0.2615,0.3796,0.27,0.61c0,0.5523-0.4477,1-1,1&#xA;&#x9;c-0.2577,0.0107-0.508-0.0873-0.69-0.27L7.5,8.87l-4.85,4.85C2.4793,13.8963,2.2453,13.9971,2,14c-0.5523,0-1-0.4477-1-1&#xA;&#x9;c-0.0047-0.2478,0.093-0.4866,0.27-0.66L6.16,7.5L1.27,2.61C1.1052,2.4488,1.0085,2.2304,1,2c0-0.5523,0.4477-1,1-1&#xA;&#x9;C2.2404,1.0029,2.4701,1.0998,2.64,1.27z" />
                </svg>
                <p className='text-3xl text-white font-bold'>You Guessed the Wrong Answer</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}

export default page