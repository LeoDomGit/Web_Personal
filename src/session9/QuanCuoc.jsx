import React from "react";
import { useDispatch } from "react-redux";
import { useSpring, animated } from "react-spring";
import { beting } from "./redux/slices/bauCuaSlices";

function QuanCuoc({ item }) {
  const [propsUseSpringInCrease, setInCrease] = useSpring(() => ({
    to: { scale: 1 },
    from: { scale: 1 },
  }));
  const [propsUseSpringDeCrease, setDeCrease] = useSpring(() => ({
    to: { scale: 1 },
    from: { scale: 1 },
  }));

  const dispatch = useDispatch();

  const handleClickIncrease = (item, status) => {
    setInCrease.start({
      from: {
        scale: 1.25,
      },
      to: {
        scale: 1,
      },
    });
    dispatch(beting({
      item : item,
      status : status
    }))
  };

  const handleClickDecrease = (item,status) => {
    setDeCrease.start({
      from: {
        scale: 1.25,
      },
      to: {
        scale: 1,
      },
    });
    dispatch(beting({
      item : item,
      status : status
    }))
  };

  return (
    <div className="w-[200px]">
      <img src={item.img} alt="" />
      <div className="h-[50px] bg-emerald-500 mt-2 p-1 flex justify-evenly">
        <animated.button
          onClick={() => handleClickDecrease(item, 'minus')}
          style={{ ...propsUseSpringDeCrease }}
          className="flex justify-center items-center h-10 w-10 bg-red-600 text-white text-4xl font-sans font-bold"
        >
          -
        </animated.button>

        <p className="flex justify-center items-center h-10 w-10 text-white text-4xl font-sans font-bold">
          {item.score}
        </p>
        <animated.button
          onClick={() => handleClickIncrease(item, 'plus')}
          style={{ ...propsUseSpringInCrease }}
          className="flex justify-center items-center h-10 w-10 bg-red-600 text-white text-4xl font-sans font-bold"
        >
          +
        </animated.button>
      </div>
    </div>
  );
}

export default QuanCuoc;
