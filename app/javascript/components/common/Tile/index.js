import React from "react";
import "./Tile.css";

const Tile = props => {
  const { selected, letter, handleClick, extraClass } = props;

  return (
    <button
      className={selected ? ` tile-selected ${extraClass}` : `tile ${extraClass} `}
      onClick={handleClick}
    >
      {letter}
    </button>
  );
};

export default Tile;
