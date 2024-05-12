import React from 'react';

const Navbar = ({ currentRound, setCurrentRound, setCurrentIndex }) => {
  const handleRoundChange = (round) => {
    setCurrentRound(round);
    setCurrentIndex((round - 1) * 4); // Assuming each round has 4 questions
  };

  return (
    <nav className="flex justify-center items-center bg-gray-800 text-white p-4 w-[80vw] fixed">
      <div>
        <ul className="flex gap-5  ">
          {[1, 2, 3, 4].map((round) => (
            <li
              key={round}
              className={`cursor-pointer px-14 py-2  ${
                currentRound === round ? 'text-black font-bold bg-purple-400 rounded-lg' : 'text-gray-300'
              }`}
              onClick={() => handleRoundChange(round)}
            >
              Round {round}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
