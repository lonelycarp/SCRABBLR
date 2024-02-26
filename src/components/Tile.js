import React from 'react';
import '../styles/components/Tile.css';

function Tile({ letter, value, isSelected, onClick }) {
    return (
      <div className={`tile ${isSelected ? 'selected' : ''}`} onClick={onClick}>
        {letter} <sub>{value}</sub>
      </div>
    );
  }

export default Tile;