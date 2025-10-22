
import React, { useState, useEffect } from 'react';
import { Board } from './components/Board';
import { GameStatus } from './components/GameStatus';
import { ResetButton } from './components/ResetButton';
import type { SquareValue } from './types';

const calculateWinner = (squares: SquareValue[]): SquareValue => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

const App: React.FC = () => {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<SquareValue>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);

  useEffect(() => {
    const calculatedWinner = calculateWinner(board);
    if (calculatedWinner) {
      setWinner(calculatedWinner);
    } else if (board.every(square => square !== null)) {
      setIsDraw(true);
    }
  }, [board]);

  const handleSquareClick = (index: number) => {
    if (winner || board[index]) {
      return;
    }
    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setIsDraw(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 to-gray-800">
      <div className="flex flex-col items-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
          Tic-Tac-Toe
        </h1>
        
        <GameStatus winner={winner} isDraw={isDraw} xIsNext={xIsNext} />
        
        <Board squares={board} onSquareClick={handleSquareClick} winner={winner} />
        
        {(winner || isDraw) && <ResetButton onReset={handleReset} />}
      </div>
      <footer className="absolute bottom-4 text-slate-500 text-sm">
        Built by a World-Class React Engineer
      </footer>
    </main>
  );
};

export default App;
