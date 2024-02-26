// src/TileRack.js
import React from 'react';
import Tile from './Tile.js';

function TileRack({ tiles, onTileClick, selectedTileIndex }) {
  return (
    <div className="tile-rack">
      {tiles.map((tile, index) => (
        <Tile //Tile.js component 
          key={index}
          letter={tile.letter}
          value={tile.value}
          isSelected={selectedTileIndex === index}
          onClick={() => onTileClick(tile, index)}
        />
      ))}
    </div>
  );
}

export default TileRack;
