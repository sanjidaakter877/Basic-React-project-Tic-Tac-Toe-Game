import React, { useState } from "react";
import "./TicTacToe.css";

const createBoard = () => [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

export default function TicTacToe() {
  const [board, setBoard] = useState(createBoard());
  const [xTurn, setXTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("🎉 Tic Tac Toe Fun 🎉");

  const checkWinner = (b) => {
    for (let i = 0; i < 3; i++) {
      if (b[i][0] && b[i][0] === b[i][1] && b[i][1] === b[i][2]) return b[i][0];
      if (b[0][i] && b[0][i] === b[1][i] && b[1][i] === b[2][i]) return b[0][i];
    }
    if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) return b[0][0];
    if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) return b[0][2];
    return null;
  };

  const isDraw = (b) => {
    return b.every((row) => row.every((cell) => cell !== ""));
  };

  const handleClick = (row, col) => {
    if (gameOver || board[row][col] !== "") return;

    const newBoard = board.map((r, i) =>
      r.map((cell, j) =>
        i === row && j === col ? (xTurn ? "X" : "O") : cell
      )
    );

    const winner = checkWinner(newBoard);

    if (winner) {
      setBoard(newBoard);
      setGameOver(true);
      setMessage(`🎊 ${winner} wins! 🎊`);
      return;
    }

    if (isDraw(newBoard)) {
      setBoard(newBoard);
      setGameOver(true);
      setMessage("🤝 It's a draw!");
      return;
    }
    setBoard(newBoard);

    const nextTurn = !xTurn;
    setXTurn(nextTurn);
    setMessage(nextTurn ? "❌ X's Turn" : "⭕ O's Turn");
  };

  const resetBoard = () => {
    setBoard(createBoard());
    setXTurn(true);
    setGameOver(false);
    setMessage("🎉 Tic Tac Toe Fun 🎉");
  };

  return (
    <div className="container">
      <h2 className="title">{message}</h2>

      <div className="board">
        {board.map((row, i) => (
          <div key={i} className="row">
            {row.map((cell, j) => (
              <button
                key={j}
                className="cell"
                style={{ color: cell === "X" ? "#3498db" : "#e74c3c" }}
                onClick={() => handleClick(i, j)}
              >
                {cell}
              </button>
            ))}
          </div>
        ))}
      </div>

      <button className="reset-btn" onClick={resetBoard}>
        🔄 Reset
      </button>
    </div>
  );
}
