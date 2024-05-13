import React from 'react';

const Navbar = ({ currentRound, setCurrentRound, setCurrentIndex, setResetCard }) => {
  const handleRoundChange = (round) => {
    setCurrentRound(round);

    switch (round) {
      case 1:
        setCurrentIndex(0); // Start from the first question in round 1
        break;
      case 2:
        setCurrentIndex(5); // Start from the 6th question in round 2
        break;
      case 3:
        setCurrentIndex(9); // Start from the 10th question in round 3
        break;
      default:
        break;
    }

    setResetCard(true); // Set resetCard to true to reset flipped cards to front face
  };

  return (
    <nav className="flex justify-center items-center bg-gray-800 text-white p-4 w-[70vw] fixed z-50">
      <div>
        <ul className="flex gap-5">
          {[1, 2, 3].map((round) => (
            <li
              key={round}
              className={`cursor-pointer px-14 py-2 ${
                currentRound === round
                  ? 'text-black font-bold bg-purple-400 rounded-lg'
                  : 'text-gray-300'
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
