import React, { useState } from 'react';

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard( {onSelectSquare ,activePlayerSymbol}) {

    const [gameboard , setGameboard] = useState(initialGameboard);

    function handleSelectSquare(rowIndex,colIndex){
        setGameboard((prevGameboard) => {
            const updatedBoard = [...prevGameboard.map(innerArray => [...innerArray])];
            updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
            return updatedBoard;
        })
        onSelectSquare();
    }
  return (
    <ol id="game-board">
      {gameboard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() =>{handleSelectSquare(rowIndex,colIndex)}}>{playerSymbol}</button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
