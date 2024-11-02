import React, { useState, useEffect } from "react";
import "../css/flip.css";
import animalIcons from "./animalIcons"; 
import Navbar from "../Components/Navbar";

const shuffleArray = (array) => {
  return array
    .concat(array) // Duplicate for pairs
    .sort(() => 0.5 - Math.random());
};

const Flip = () => {
  const [tiles, setTiles] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);

  useEffect(() => {
    setTiles(shuffleArray(animalIcons));
  }, []);

  const handleTileClick = (index) => {
    if (selectedTiles.length < 2 && !selectedTiles.includes(index)) {
      setSelectedTiles([...selectedTiles, index]);
    }
  };

  useEffect(() => {
    if (selectedTiles.length === 2) {
      const [firstIndex, secondIndex] = selectedTiles;
      if (tiles[firstIndex] === tiles[secondIndex]) {
        setMatchedPairs([...matchedPairs, tiles[firstIndex]]);
      }
      setTimeout(() => {
        setSelectedTiles([]);
      }, 1000);
    }
  }, [selectedTiles, tiles, matchedPairs]);

  return (
    <>
      <Navbar />
      <div className="game_container mt-4 align-middle">
        <div className="game_grid">
          {tiles.map((tile, index) => (
            <div
              key={index}
              className={`game_tile ${selectedTiles.includes(index) || matchedPairs.includes(tile) ? "flip" : ""}`}
              onClick={() => handleTileClick(index)}
            >
              <div className="game_tile-inner">
                {/* Front of the card (hidden initially) */}
                <div className="game_tile-front"></div>
                {/* Back of the card (shows animal when flipped) */}
                <div className="game_tile-back">
                  {(selectedTiles.includes(index) || matchedPairs.includes(tile)) && (
                    <img src={tile} alt="animal" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Flip;
