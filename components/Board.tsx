
import React from 'react';
import { Square } from './Square';
import type { SquareValue } from '../types';

interface BoardProps {
  squares: SquareValue[];
  onSquareClick: (index: number) => void;
  winner: SquareValue;
}

const getWinningLine = (squares: SquareValue[]): number[] | null => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return line;
    }
  }
  return null;
};

export const Board: React.FC<BoardProps> = ({ squares, onSquareClick, winner }) => {
  const winningLine = winner ? getWinningLine(squares) : null;

  return (
    <div className="grid grid-cols-3 gap-3 p-3 bg-slate-900/50 rounded-xl shadow-2xl">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onSquareClick(i)}
          isWinner={winningLine?.includes(i) ?? false}
        />
      ))}
    </div>
  );
};
