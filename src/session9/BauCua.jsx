import React from "react";
import QuanCuoc from "./QuanCuoc";
import { useDispatch, useSelector } from "react-redux";
import XucXac from "./XucXac";
import { useSpring } from "react-spring";
import { playAgain, playGame } from "./redux/slices/bauCuaSlices";

function BauCua() {
  const { betingList, totalScore, arrDice } = useSelector(
    (state) => state.bauCua
  );
  const dispatch = useDispatch()

  const [propsDice, set] = useSpring(() => ({
    to: {
      xyz: [1800, 1800, 1800],
    },
    from: {
      xyz: [0, 0, 0],
    },
    config: {
      duration: 1000,
    },
    reset: true,
  }));

  const handlePlay = () => {
    set.start({
      to: {
        xyz: [1800, 1800, 1800],
      },
      from: {
        xyz: [0, 0, 0],
      },
      config: {
        duration: 1000,
      }
    });
    dispatch(playGame());
  }
  
  return (
    <div className="h-screen bg-gradient-to-r from-orange-300 to-orange-200 font-game pt-10">
      <h1 className="text-center text-5xl">Game bầu cua</h1>
      <div className="flex justify-center items-center">
        <p className=" w-[250px] text-center mt-5 text-2xl text-white bg-red-600 p-2">
          Tiền thưởng <span className="text-yellow-400"> {totalScore}$ </span>
        </p>
      </div>
      <div className="flex justify-center items-center mt-5">
        <button onClick={()=> dispatch(playAgain())} className=" text-center text-2xl text-white bg-emerald-500 p-2">
          Chơi lại
        </button>
      </div>
      <div className="flex mt-10">
        <div className="w-3/5 p-2 grid grid-cols-3 gap-y-5">
          {betingList.length > 0 &&
            betingList.map((item) => <QuanCuoc item={item} key={item.id} />)}
        </div>
        <div className="w-2/5 flex justify-center">
          <div>
            <div className="bg-white w-[300px] h-[300px] rounded-full relative">
              <div className="w-[50px] h-[50px] absolute top-0 left-[35%]">
                <XucXac propsDice={propsDice} item={arrDice[0].img} />
              </div>
              <div className="w-[50px] h-[50px] absolute top-[40%] left-[15%]">
                <XucXac  propsDice={propsDice}  item={arrDice[1].img} />
              </div>
              <div className="w-[50px] h-[50px] absolute top-[40%] left-[55%]">
                <XucXac  propsDice={propsDice}  item={arrDice[2].img} />
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <button onClick={handlePlay} className="text-3xl text-white bg-red-600 py-3 px-5 rounded-lg">
                Xốc
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BauCua;
