/*eslint-disable*/
import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

// Helper function to check for a winner
const checkWinner = (board) => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

// Main TicTacToe component
const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isPlayerTurn, setIsPlayerTurn] = useState(true);
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = 'X';
        setBoard(newBoard);

        const currentWinner = checkWinner(newBoard);
        if (currentWinner) {
            setWinner(currentWinner);
        } else {
            setIsPlayerTurn(false);
            setTimeout(() => computerMove(newBoard), 500); // Delay for computer's move
        }
    };

    const computerMove = (newBoard) => {
        const bestMove = findBestMove(newBoard);
        newBoard[bestMove] = 'O';
        setBoard(newBoard);

        const currentWinner = checkWinner(newBoard);
        if (currentWinner) {
            setWinner(currentWinner);
        } else {
            setIsPlayerTurn(true);
        }
    };

    const findBestMove = (board) => {
        let bestScore = -Infinity;
        let move = -1;

        for (let i = 0; i < board.length; i++) {
            if (board[i] === null) {
                board[i] = 'O';
                const score = minimax(board, 0, false);
                board[i] = null;

                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }
        return move;
    };

    const minimax = (board, depth, isMaximizing) => {
        const winner = checkWinner(board);
        if (winner === 'O') return 10 - depth;
        if (winner === 'X') return depth - 10;
        if (!board.includes(null)) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'O';
                    const score = minimax(board, depth + 1, false);
                    board[i] = null;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < board.length; i++) {
                if (board[i] === null) {
                    board[i] = 'X';
                    const score = minimax(board, depth + 1, true);
                    board[i] = null;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsPlayerTurn(true);
        setWinner(null);
    };

    return (
        <>
        <Navbar />
        <div style={styles.container}>
            <div style={styles.board}>
                {board.map((cell, index) => (
                    <div
                        key={index}
                        style={styles.cell}
                        onClick={() => handleClick(index)}
                    >
                        {cell}
                    </div>
                ))}
            </div>
            {winner && (
                <div style={styles.result}className='text-center'>
                    <h3>{winner === 'X' ? 'You win!' : 'Computer wins!'}</h3>
                    <button className='btn text-center btn-outline-primary' onClick={resetGame} style={styles.resetButton}>Play Again</button>
                </div>
            )}
            {!winner && !board.includes(null) && (
                <div style={styles.result} className='text-center'>
                    <h3>It's a Draw!</h3>
                    <button className='btn btn-outline-primary' onClick={resetGame} style={styles.resetButton}>Play Again</button>
                </div>
            )}
        </div>
        </>

    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    board: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 100px)',
        gridTemplateRows: 'repeat(3, 100px)',
        gap: '5px',
    },
    cell: {
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        cursor: 'pointer',
        backgroundColor: '#f0f0f0',
        border: '1px solid #333',
    },
    result: {
        marginTop: '20px',
    },
    resetButton: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default TicTacToe;