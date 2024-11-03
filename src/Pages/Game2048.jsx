/* eslint-disable */
import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

const BOARD_SIZE = 4;
const INITIAL_TILES = 2;

const getRandomInt = (max) => Math.floor(Math.random() * max);

const getEmptyBoard = () => Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));

const addRandomTile = (board) => {
    let emptyTiles = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c] === 0) emptyTiles.push([r, c]);
        }
    }
    if (emptyTiles.length === 0) return board;
    const [row, col] = emptyTiles[getRandomInt(emptyTiles.length)];
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
    return board;
};

const initializeBoard = () => {
    let newBoard = getEmptyBoard();
    for (let i = 0; i < INITIAL_TILES; i++) newBoard = addRandomTile(newBoard);
    return newBoard;
};

const moveLeft = (board, setScore) => {
    let newScore = 0;
    let newBoard = board.map(row => {
        let filteredRow = row.filter(tile => tile !== 0);
        for (let i = 0; i < filteredRow.length - 1; i++) {
            if (filteredRow[i] === filteredRow[i + 1] && filteredRow[i] !== 0) {
                filteredRow[i] *= 2;
                newScore += filteredRow[i];
                filteredRow[i + 1] = 0;
            }
        }
        return [...filteredRow.filter(tile => tile !== 0), ...Array(BOARD_SIZE - filteredRow.filter(tile => tile !== 0).length).fill(0)];
    });
    setScore(prevScore => prevScore + newScore);
    return newBoard;
};

const rotateRight = (matrix) => {
    const result = getEmptyBoard();
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            result[c][BOARD_SIZE - r - 1] = matrix[r][c];
        }
    }
    return result;
};

const moveRight = (board, setScore) => rotateRight(rotateRight(moveLeft(rotateRight(rotateRight(board)), setScore)));
const moveUp = (board, setScore) => rotateRight(moveLeft(rotateRight(rotateRight(rotateRight(board))), setScore));
const moveDown = (board, setScore) => rotateRight(rotateRight(rotateRight(moveLeft(rotateRight(board), setScore))));

const hasGameOver = (board) => {
    for (let r = 0; r < BOARD_SIZE; r++) {
        for (let c = 0; c < BOARD_SIZE; c++) {
            if (board[r][c] === 0) return false;
            if (c < BOARD_SIZE - 1 && board[r][c] === board[r][c + 1]) return false;
            if (r < BOARD_SIZE - 1 && board[r][c] === board[r + 1][c]) return false;
        }
    }
    return true;
};

const Game2048 = () => {
    const [board, setBoard] = useState(initializeBoard);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);
    const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
    
    const moveBoard = (newBoard) => {
        if (JSON.stringify(newBoard) !== JSON.stringify(board)) {
            setBoard(addRandomTile(newBoard));
            if (hasGameOver(newBoard)) setGameOver(true);
        }
    };

    const handleKeyDown = (e) => {
        if (gameOver) return;
        switch (e.key) {
            case 'ArrowLeft':
                moveBoard(moveLeft(board, setScore));
                break;
            case 'ArrowRight':
                moveBoard(moveRight(board, setScore));
                break;
            case 'ArrowUp':
                moveBoard(moveUp(board, setScore));
                break;
            case 'ArrowDown':
                moveBoard(moveDown(board, setScore));
                break;
            default:
                break;
        }
    };

    // Touch event handlers for mobile support
    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        setTouchStart({ x: touch.clientX, y: touch.clientY });
        e.preventDefault(); // Prevent default touch behavior (scrolling)
    };

    const handleTouchEnd = (e) => {
        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStart.x;
        const dy = touch.clientY - touchStart.y;
        
        if (gameOver) return;

        // Determine if the swipe is horizontal or vertical and in which direction
        if (Math.abs(dx) > Math.abs(dy)) {
            if (dx > 0) {
                moveBoard(moveRight(board, setScore));
            } else {
                moveBoard(moveLeft(board, setScore));
            }
        } else {
            if (dy > 0) {
                moveBoard(moveDown(board, setScore));
            } else {
                moveBoard(moveUp(board, setScore));
            }
        }
        e.preventDefault(); // Prevent default touch behavior (scrolling)
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [board, gameOver]);

    const resetGame = () => {
        setBoard(initializeBoard());
        setGameOver(false);
        setScore(0);
    };

    return (
      <>
      <Navbar/>
      <div
            style={styles.container}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div style={styles.board}>
                {board.map((row, rowIndex) => (
                    <div style={styles.row} key={rowIndex}>
                        {row.map((tile, colIndex) => (
                            <div style={{ ...styles.tile, backgroundColor: tileColors[tile] }} key={colIndex}>
                                {tile !== 0 ? tile : ''}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <h2 className='mt-4'>Score: {score}</h2>
            {gameOver && <h2>Game Over!</h2>}
            <button className='btn btn-outline-danger' style={styles.button} onClick={resetGame}>Restart</button>
        </div>
      </>
    );
};

const tileColors = {
    0: '#cdc1b4',
    2: '#eee4da',
    4: '#ede0c8',
    8: '#f2b179',
    16: '#f59563',
    32: '#f67c5f',
    64: '#f65e3b',
    128: '#edcf72',
    256: '#edcc61',
    512: '#edc850',
    1024: '#edc53f',
    2048: '#edc22e',
};

const styles = {
    container: {
        textAlign: 'center',
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
    },
    board: {
        display: 'inline-block',
        backgroundColor: '#bbada0',
        padding: '5px',
        borderRadius: '5px',
    },
    row: {
        display: 'flex',
    },
    tile: {
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#776e65',
        margin: '3px',
        borderRadius: '3px',
    },
    button: {
        marginTop: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default Game2048;
