import { TileData } from "../data";

/**
 *  Split a string to an equal [size]
 *  @param size : 'size of the chunk' 
 */
String.prototype.chunk = function (size) {
  return [].concat.apply([],
    this.split('').map(function (x, i) { return i % size ? [] : this.slice(i, i + size) }, this)
  )
}

/**
 *  Randomize a string 
 */
String.prototype.shuffle = function () {
  var a = this.split(""),
    n = a.length;

  for (var i = n - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a.join("");
}


/**
 * Generate a random 2D board of size [n x n]
 * @param boardData : 'string'
 * @param boardSize : integer number
*/
export const shuffleBoard = (boardData, boardSize) => {
  // Shuffle the board data
  // Divide into chunks of equal size
  // Create a 2D array of n-size with the chunk data
  const board = [];
  
  if (boardData && boardSize) {

    let strLength = boardData.length;

    if (strLength / boardSize != boardSize) return [];

    boardData = boardData.shuffle();
    const dice = boardData.chunk(boardSize);

    for (var row = 0; row < boardSize; row++) {
      var cols = [];
      var diceRow = dice[row];

      for (var col = 0; col < boardSize; col++) {
        let face = diceRow[col];
        const tileData = new TileData(face, row, col);
        cols.push(tileData);
      }
      board.push(cols);
    }
  }

  return board;
};

/**
* 
*/
export const copyBoard = board => {
  const copiedBoard = board.map(row => {
    return row.map(tile => {
      return tile.clone();
    });
  });
  return copiedBoard;
};

export const isTileEqual = (tile1, tile2) => {
  if (!tile1 || !tile2) return false;
  return tile1.rowId === tile2.rowId && tile1.columnId === tile2.columnId;
};

export const isAdjacent = (tile1, tile2) => {
  if (!tile1 || !tile2) return false;
  if (isTileEqual(tile1, tile2)) {
    return false;
  }

  const colDiff = Math.abs(tile1.columnId - tile2.columnId);
  const rowDiff = Math.abs(tile1.rowId - tile2.rowId);
  if (colDiff <= 1 && rowDiff <= 1) {
    return true;
  } else {
    return false;
  }
};
