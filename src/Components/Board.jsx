import React, { useState } from "react";
import Square from "./Square";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState(null);
  const calculateWinner = (squares) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };
  const handleReplay = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };
  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? "X" : "O";
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    // Check for a draw
    if (
      calculateWinner(newSquares) === null &&
      newSquares.every((square) => square !== null)
    ) {
      setStatus("Draw!");
    }
  };

  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => handleClick(i)} />;
  };

  const winner = calculateWinner(squares);
  const gameStatus = winner
    ? `Winner: ${winner}`
    : status
    ? status
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="text-center container ticcontainer">
        <div className="mb-4">{gameStatus}</div>
        <div className="board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <button className="btn btn-primary mt-3" onClick={handleReplay}>
            Replay
          </button>
        </div>
      </div>
    </>
  );
}

export default Board;
