import React from "react";
import Navbar from "../Components/Navbar";
import Board from "../Components/Board";
import "../tictactoe.css";
function Tic() {
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h3 className="text-center mb-4">Tic Tac Toe</h3>
        <Board />
      </div>
    </>
  );
}

export default Tic;
