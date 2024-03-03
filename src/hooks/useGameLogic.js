import { useState, useEffect } from 'react';
import { initializeBoard, initializeTilePool, drawTiles } from '../utils/gameUtils';
import tileDistribution from '../TileDistribution';

export function useGameLogic() {
  const [board, setBoard] = useState(initializeBoard());
  const [tilePool, setTilePool] = useState(initializeTilePool());
  const [playerTiles, setPlayerTiles] = useState([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState(null);
  const [lastPlacedTile, setLastPlacedTile] = useState({row: null, col: null}); // Initialize with null row and col
  const [newlyPlacedTiles, setNewlyPlacedTiles] = useState([]);
  const [orientation, setOrientation] = useState(null);
  const [score, setScore] = useState(0);


  useEffect(() => {
    const { drawnTiles, newPool } = drawTiles(tilePool, 7);
    setPlayerTiles(drawnTiles);
    setTilePool(newPool);
  }, []); // Include tilePool in dependency array if its changes should trigger the effect

  const handleTileClick = (tile, index) => {
    setSelectedTileIndex(selectedTileIndex === index ? null : index);
  };

  const placeTile = (rowIndex, cellIndex) => {
    // Update the board with the new tile
    const newBoard = [...board];
    const newRow = [...newBoard[rowIndex]];
    const tileToPlace = playerTiles[selectedTileIndex];
    const cellType = board[rowIndex][cellIndex].type; // Assuming each cell has a type
    const newTile = { ...tileToPlace, rowIndex, cellIndex, type: cellType };
    setNewlyPlacedTiles(current => [...current, newTile]);
    newRow[cellIndex] = { ...tileToPlace, type: cellType }; // Preserve special cell type
    newBoard[rowIndex] = newRow;
    setBoard(newBoard);

    // Update the player's tiles by removing the placed tile
    const updatedTiles = playerTiles.filter((_, index) => index !== selectedTileIndex);
    setPlayerTiles(updatedTiles);
    // Reset the selected tile index
    setSelectedTileIndex(null);
    console.log(cellType)
  };
  

  const handleCellClick = (rowIndex, cellIndex) => {
    if (selectedTileIndex !== null && !board[rowIndex][cellIndex].letter) {
      // Check for invalid placement only after the first tile has been placed
      if (lastPlacedTile && !isValidPlacement(rowIndex, cellIndex)) {
        console.log('Invalid placement');
        return;
      }
  
      placeTile(rowIndex, cellIndex);
  
      // Determine orientation after the second tile is placed
      if (!orientation && lastPlacedTile) {
        determineOrientation(rowIndex, cellIndex);
      }
  
      // Update lastPlacedTile with the current placement
      setLastPlacedTile({ row: rowIndex, col: cellIndex });
    }
  };
  
  const isValidPlacement = (rowIndex, cellIndex) => {
    // Allow the first tile placement anywhere.
    if (!lastPlacedTile.row && !lastPlacedTile.col) return true;
  
    // For subsequent tiles, check if they are placed next to at least one tile.
    const hasAdjacentTile = [
      { row: rowIndex - 1, col: cellIndex },
      { row: rowIndex + 1, col: cellIndex },
      { row: rowIndex, col: cellIndex - 1 },
      { row: rowIndex, col: cellIndex + 1 },
    ].some(({ row, col }) => {
      return row >= 0 && row < board.length && col >= 0 && col < board[0].length && board[row][col].letter;
    });
  
    if (!hasAdjacentTile) return false; // If no adjacent tile, invalid placement.
  
    // After the first tile, determine if the placement follows the established orientation.
    if (orientation) {
      if (orientation === 'horizontal') {
        return rowIndex === lastPlacedTile.row;
      } else { // orientation === 'vertical'
        return cellIndex === lastPlacedTile.col;
      }
    }
  
    // If orientation hasn't been set, this is the second tile being placed, so placement is valid.
    return true;
  };
  
  
  const determineOrientation = (rowIndex, cellIndex) => {
    // This should only be called on the second tile placement,
    // so check if an orientation has not yet been set.
    if (!orientation && lastPlacedTile && (lastPlacedTile.row !== null || lastPlacedTile.col !== null)) {
      if (rowIndex === lastPlacedTile.row) {
        setOrientation('horizontal');
      } else if (cellIndex === lastPlacedTile.col) {
        setOrientation('vertical');
      }
    }
  };

  const calculateScore = () => {
    let turnScore = 0;
    let wordMultiplier = 1;

    newlyPlacedTiles.forEach(({ letter, type }) => {
      const baseScore = tileDistribution.find(t => t.letter === letter)?.value || 0;
      let tileScore = baseScore;

      switch (type) {
          case 'doubleLetter': tileScore *= 2; break;
          case 'tripleLetter': tileScore *= 3; break;
          case 'doubleWord': wordMultiplier *= 2; break;
          case 'tripleWord': wordMultiplier *= 3; break;
          default: break;
      }
      turnScore += tileScore;
  });

    turnScore *= wordMultiplier;
    setScore(prevScore => prevScore + turnScore); // Update total score
    setNewlyPlacedTiles([]); // Reset for next turn
    return turnScore; // Return the calculated score for this turn
  };
  
  const submitTurn = () => {
    const turnScore = calculateScore();
    console.log("Turn Score:", turnScore);
    console.log("Newly placed tiles:", newlyPlacedTiles);
    console.log("Total Score:", score);
  }

  return {
    board,
    setBoard,
    playerTiles,
    handleTileClick,
    handleCellClick,
    selectedTileIndex,
    calculateScore,
    score,
    submitTurn,
  };
}
