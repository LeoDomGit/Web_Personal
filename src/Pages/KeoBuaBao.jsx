/*eslint-disable*/
import React, { useState } from "react";
import Navbar from "../Components/Navbar";

function KeoBuaBao() {
  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [result, setResult] = useState("");
  const [computerimg, setComputerImg] = useState("");
  const [userimg, setUserImg] = useState("");

  const choices = ["rock", "paper", "scissors"];

  const generateComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  const determineWinner = (user, computer) => {
    if (user === computer) {
      return "It's a tie!";
    } else if (
      (user === "rock" && computer === "scissors") ||
      (user === "paper" && computer === "rock") ||
      (user === "scissors" && computer === "paper")
    ) {
      return "You win!";
    } else {
      return "Computer wins!";
    }
  };

  const handleClick = (choice) => {
    const computerChoice = generateComputerChoice();
    if (computerChoice === "scissors") {
      setComputerImg("./img/scissors.png");
    } else if (computerChoice === "rock") {
      setComputerImg("./img/rock.png");
    } else if (computerChoice === "paper") {
      setComputerImg("./img/paper.png");
    }

    if (choice === "scissors") {
      setUserImg("./img/scissors.png");
    } else if (choice === "rock") {
      setUserImg("./img/rock.png");
    } else if (choice === "paper") {
      setUserImg("./img/paper.png");
    }
    console.log(choice, computerChoice);
    const winner = determineWinner(choice, computerChoice);

    setUserChoice(choice);
    setComputerChoice(computerChoice);
    setResult(winner);
  };
  return (
    <>
      <Navbar />
      <h1>Rock, Paper, Scissors Game</h1>
      <div className="container-fluid">
        {/* Set row width to 80% and center it */}
        <div
          className="row justify-content-center"
          style={{ width: "80%", margin: "0px auto" }}
        >
          {/* Column 1 */}
          <div className="col-sm-4 ">
            <div className="card bg-success">
              <div style={{ minHeight: "380px" }} className="card-body">
                <div className="row">
                  <div
                    style={{ paddingBottom: userimg === "" ? "40%" : "0px" }}
                    className="col-md"
                  >
                    <img
                      className=""
                      style={{
                        height: "180px",
                        width: "auto",
                      }}
                      src={userimg}
                      alt=""
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md">
                    <img
                      onClick={() => handleClick("scissors")}
                      className="w-100"
                      src="./img/scissors.png"
                      alt=""
                    />
                  </div>
                  <div className="col-md">
                    <img
                      className="w-100"
                      onClick={() => handleClick("rock")}
                      src="./img/rock.png"
                      alt=""
                    />
                  </div>
                  <div className="col-md">
                    <img
                      onClick={() => handleClick("paper")}
                      className="w-100"
                      src="./img/paper.png"
                      alt=""
                    />
                  </div>
                </div>
                <h5 className="card-title">Your choice</h5>
                {/* Add your content for column 1 */}
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="col-sm-4">
            <div
              style={{
                backgroundColor: result === "You win!" ? "yellow" : "Grey",
                color: result === "You win!" ? "red" : "white",
              }}
              className="card "
            >
              <div className="card-body">
                <h5 className="card-title">{result === "" ? "VS" : result}</h5>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="col-sm-4">
            <div className="card bg-primary">
              <div className="card-body">
                <img
                  className=""
                  style={{
                    height: "180px",
                    width: "auto",
                  }}
                  src={computerimg}
                  alt=""
                />
                <h5
                  className="card-title"
                  style={{ paddingTop: computerimg === "" ? "70%" : "31%" }}
                >
                  PC
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KeoBuaBao;
