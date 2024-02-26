// src/gameUtils.js
import tileDistribution from '../TileDistribution';

// Utility function to shake the tile bag
const shake = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
};

// Initialize the tile pool from the distribution
export const initializeTilePool = () => {
  let pool = [];
  tileDistribution.forEach((tile) => {
    for (let i = 0; i < tile.quantity; i++) {
      pool.push({ letter: tile.letter, value: tile.value });
    }
  });
  return shake(pool); // Shuffle the pool to randomize tile order
};

// Draw tiles from the pool
export const drawTiles = (pool, numberOfTiles) => {
  const drawnTiles = pool.slice(0, numberOfTiles);
  const newPool = pool.slice(numberOfTiles);
  return { drawnTiles, newPool };
};


// Initialize the game board with special tiles
export const initializeBoard = () => {
    const size = 15;
    const board = Array(size).fill(null).map(() => Array(size).fill({type: 'normal', multiplier: 1}));
    
    // Define the positions of special tiles
    const doubleLetter = [[0, 3], [0, 11], [2, 6], [2, 8], [3, 0], [3, 7], [3, 14], [6, 2], [6, 6], [6, 8], [6, 12], [7, 3], [7, 11], [8, 2], [8, 6], [8, 8], [8, 12], [11, 0], [11, 7], [11, 14], [12, 6], [12, 8], [14, 3], [14, 11]];
    const tripleLetter = [[1, 5], [1, 9], [5, 1], [5, 5], [5, 9], [5, 13], [9, 1], [9, 5], [9, 9], [9, 13], [13, 5], [13, 9]];
    const doubleWord = [[1, 1], [1, 13], [2, 2], [2, 12], [3, 3], [3, 11], [4, 4], [4, 10], [7, 7], [10, 4], [10, 10], [11, 3], [11, 11], [12, 2], [12, 12], [13, 1], [13, 13]];
    const tripleWord = [[0, 0], [0, 7], [0, 14], [7, 0], [7, 14], [14, 0], [14, 7], [14, 14]];
    
    // Helper function to convert coordinates and assign properties
    const assignSpecialTiles = (coords, type, multiplier) => {
        coords.forEach(([row, col]) => {
        board[row][col] = { ...board[row][col], type, multiplier };
        });
    };
    
    // Assign special tiles
    assignSpecialTiles(doubleLetter, 'double-letter', 2);
    assignSpecialTiles(tripleLetter, 'triple-letter', 3);
    assignSpecialTiles(doubleWord, 'double-word', 2);
    assignSpecialTiles(tripleWord, 'triple-word', 3);
    
    return board;
    
};

// Additional utility functions for gameplay, scoring, etc., can be added here
