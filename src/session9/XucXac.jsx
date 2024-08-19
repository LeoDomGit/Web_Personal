import React from "react";
import "./BauCua.css";
import { animated } from "react-spring";

function XucXac({propsDice, item }) {


  return (
    <>
      <div className="scene ml-5">
        <animated.div
          className="cube"
          style={{
            transform: propsDice.xyz.interpolate(
              (x, y, z) =>
                `translateZ(-25px) rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`
            ),
          }}
        >
          <div className="cube__face front">
            <img classname="w-full" src={item} alt="not found" />
          </div>
          <div className="cube__face back">
            <img classname="w-full" src="./img/ca.png" alt="not found" />
          </div>
          <div className="cube__face right">
            <img classname="w-full" src="./img/bau.png" alt="not found" />
          </div>
          <div className="cube__face left">
            <img classname="w-full" src="./img/tom.png" alt="not found" />
          </div>
          <div className="cube__face top">
            <img classname="w-full" src="./img/cua.png" alt="not found" />
          </div>
          <div className="cube__face bottom">
            <img classname="w-full" src="./img/nai.png" alt="not found" />
          </div>
        </animated.div>
      </div>
    </>
  );
}

export default XucXac;
