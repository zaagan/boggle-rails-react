export default class TileData {
  constructor(letter, rowId, columnId, selected = false, hint = false) {
    this.letter = letter;
    this.rowId = rowId;
    this.columnId = columnId;
    this.selected = selected;
    this.hint = hint;
  }

  clone() {
    return new TileData(this.letter, this.rowId, this.columnId, this.selected, this.hint);
  }
}
