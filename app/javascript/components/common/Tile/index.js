import React from "react";
import "./Tile.css";

const Tile = props => {
  const { hint, selected, letter, handleClick, extraClass } = props;

  let tileClass = '';
  if (extraClass) {
    tileClass += extraClass;
  }

  if (hint && !selected) {
    tileClass += ' hint ';
  }



  return (
    <button
      className={selected ? ` tile-item tile-selected ${tileClass}` : `tile-item tile ${tileClass} `}
      onClick={handleClick}
    >
      {letter}
    </button>
  );
};

export default Tile;
