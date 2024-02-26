// App.js
import React from 'react';
import Board from './components/Board';
import TileRack from './components/TileRack';
import './styles/App.css';
import { useGameLogic } from './hooks/useGameLogic'; // Make sure the path matches where you saved useGameLogic.js

function App() {
  const {
    board,
    handleCellClick,
    playerTiles,
    handleTileClick,
    selectedTileIndex,
    submitTurn, // Assuming this function is implemented in useGameLogic
  } = useGameLogic();

  return (
    <div className="App">
      <h1>Scrabblr</h1>
      <div className="game-container">
        <div className="game-area">
          <Board 
            board={board} 
            handleCellClick={handleCellClick} 
          />
          <TileRack 
            tiles={playerTiles} 
            onTileClick={handleTileClick} 
            selectedTileIndex={selectedTileIndex} 
          />
        </div>
        <div className="side-panel">
          <button onClick={submitTurn} className="submit-turn-button">Submit Turn</button>
          {/* Future Scoreboard goes here */}
        </div>
      </div>
    </div>
  );
}

export default App;
