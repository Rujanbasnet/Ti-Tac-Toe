
import React from 'react';
import type { SquareValue } from '../types';

interface GameStatusProps {
  winner: SquareValue;
  isDraw: boolean;
  xIsNext: boolean;
}

export const GameStatus: React.FC<GameStatusProps> = ({ winner, isDraw, xIsNext }) => {
  let statusText: string;
  let textColor: string = 'text-slate-300';

  if (winner) {
    statusText = `Winner: ${winner}!`;
    textColor = winner === 'X' ? 'text-blue-400' : 'text-orange-400';
  } else if (isDraw) {
    statusText = "It's a Draw!";
    textColor = 'text-yellow-400';
  } else {
    statusText = `Next player: ${xIsNext ? 'X' : 'O'}`;
    textColor = xIsNext ? 'text-blue-400' : 'text-orange-400';
  }

  return (
    <div className="text-center p-3 rounded-lg bg-slate-800/50 min-w-[250px] shadow-md">
      <p className={`text-2xl font-semibold transition-colors duration-300 ${textColor}`}>
        {statusText}
      </p>
    </div>
  );
};
