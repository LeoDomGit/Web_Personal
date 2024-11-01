import React from "react";
import Navbar from "../Components/Navbar";
import Board from "../Components/Board";
import "../css/tictactoe.css";
function Tic() {
  return (
    <>
      <Navbar />
      <div className="mt-5">
        <Board />
      </div>
    </>
  );
}

export default Tic;
