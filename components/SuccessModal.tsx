import React from 'react';

interface SuccessModalProps {
  onClose: () => void;
  moves: number;
  time: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose, moves, time }) => {

  const formatTimeForDisplay = (totalSeconds: number): string => {
    if (totalSeconds < 60) {
      return `${totalSeconds} seconds`;
    }
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const minuteText = `${minutes} minute${minutes > 1 ? 's' : ''}`;
    const secondText = seconds > 0 ? ` and ${seconds} second${seconds > 1 ? 's' : ''}` : '';
    return `${minuteText}${secondText}`;
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white text-gray-800 rounded-2xl p-8 sm:p-12 text-center shadow-2xl transform transition-all scale-100 opacity-100">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Well done!</h2>
        <p className="text-lg mb-6">
          You solved it in <span className="font-bold">{moves} moves</span> and <span className="font-bold">{formatTimeForDisplay(time)}</span>.
        </p>
        <button
          onClick={onClose}
          className="bg-[#FF007A] text-white font-bold py-3 px-8 rounded-full hover:bg-pink-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-pink-300"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;