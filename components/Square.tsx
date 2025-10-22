
import React from 'react';
import type { SquareValue } from '../types';
import { XIcon, OIcon } from './icons';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isWinner: boolean;
}

export const Square: React.FC<SquareProps> = ({ value, onClick, isWinner }) => {
  const baseClasses = "w-24 h-24 md:w-28 md:h-28 flex items-center justify-center p-4 rounded-lg shadow-lg transition-all duration-200 ease-in-out transform";
  const stateClasses = isWinner 
    ? "bg-green-500/30" 
    : "bg-slate-800 hover:bg-slate-700 hover:scale-105 cursor-pointer";

  return (
    <button className={`${baseClasses} ${stateClasses}`} onClick={onClick} aria-label={`Square ${value ? `with ${value}` : 'empty'}`}>
      <div className="w-full h-full transform transition-transform duration-300 ease-out scale-0 animate-pop-in">
        {value === 'X' && <XIcon />}
        {value === 'O' && <OIcon />}
      </div>
      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.3s ease-out forwards;
        }
      `}</style>
    </button>
  );
};
