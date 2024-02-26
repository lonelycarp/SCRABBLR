// src/Board.js
import React from 'react';
import Tile from './Tile';

function Board({ board, handleCellClick }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div
              key={cellIndex}
              className={`cell ${cell.type}`}
              onClick={() => handleCellClick(rowIndex, cellIndex)}
            >
              {cell.letter && (
                <Tile
                letter={cell.letter}
                value={cell.value}
                isSelected={false}
                onClick={() => handleCellClick(rowIndex, cellIndex)}
                />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
