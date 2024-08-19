import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { betting, playGame } from "./redux/slices/xucxacSlices";
import Navbar from "../Components/Navbar";

function Taixiu() {
  const { taixiu, arrDice, totalWin, totalPlays } = useSelector(
    (state) => state.xucxac
  );
  const dispatch = useDispatch(); // Fixed typo from 'distpatch' to 'dispatch'

  return (
    <>
      <Navbar />

      <div
        className="w-full h-screen bg-cover bg-no-repeat flex flex-col items-center justify-center"
        style={{
          backgroundImage: "url('./img/bgGame.png')",
          minHeight: "890px",
        }}
      >
        <h1 className="text-6xl font-game mb-10">Game Tài Xỉu</h1>

        <div className="w-100 text-center">
          <button
            onClick={() => dispatch(betting("Tài"))}
            className="btn btn-danger mx-4"
            style={{ height: "80px", width: "90px" }}
          >
            Tài
          </button>
          <div className="flex flex-col items-center">
            <div className="flex">
              {arrDice.map((dice, index) => (
                <img
                  key={index}
                  className="w-[100px] mx-2"
                  src={dice.img}
                  alt={`Dice ${index + 1}`}
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => dispatch(betting("Xỉu"))}
            className="btn btn-success mx-4"
            style={{ height: "80px", width: "90px" }}
          >
            Xỉu
          </button>
        </div>

        <div className="font-game text-5xl mb-10">
          <p className="text-center mb-4">
            Bạn chọn : <span className="text-red-700">{taixiu}</span>
          </p>
          <p className="text-center mb-4">
            Bàn thắng : <span className="text-green-700">{totalWin}</span>
          </p>
          <p className="text-center mb-4">
            Số bàn chơi : <span className="text-blue-700">{totalPlays}</span>
          </p>
        </div>

        <div className="w-100 text-center">
          <div className="w-100 text-center">
            <div
              onClick={() => {
                taixiu !== ""
                  ? dispatch(playGame())
                  : alert("Vui lòng đặt cược");
              }}
              className="button w-40 h-16 bg-lime-500 rounded-lg cursor-pointer select-none
                active:translate-y-2  active:[box-shadow:0_0px_0_0_#4d7c0f,0_0px_0_0_#4d7c0f]
                active:border-b-[0px]
                transition-all duration-150 [box-shadow:0_10px_0_0_#4d7c0f,0_15px_0_0_#4d7c0f]
                border-b-[1px] border-lime-400 flex items-center justify-center
              "
            >
              <span
                className="btn btn-warning"
                style={{ height: "54px", width: "140px" }}
              >
                Play
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Taixiu;
