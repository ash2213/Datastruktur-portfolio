export class Grid {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.data = new Array(rows * cols).fill(undefined);
  }

  set({ row, col }, value) {}

  inBounds(row, col) {
    return (
      Number.isInteger(row) &&
      Number.isInteger(col) &&
      row >= 0 &&
      row < this.rows &&
      col >= 0 &&
      col < this.cols
    );
  }

  indexFor({ row, col }) {
    if (!this.inBounds(row, col)) return undefined;
    const index = row * this.cols + col;
    return index;
  }

  rowColFor(index) {
    if (!Number.isInteger(index) || index < 0 || index >= this.data.length)
      return undefined;
    const row = Math.floor(index / this.cols);
    const col = index % this.cols;
    return { row, col };
  }

  set({ row, col }, value) {
    if (!this.inBounds(row, col)) return;
    this.data[row * this.cols + col] = value;
  }

  get({ row, col }) {
    if (!this.inBounds(row, col)) return undefined;
    return this.data[row * this._cols + col];
  }

  fill(value) {
    this.data.fill(value);
  }

  rows() {
    return this.row;
  }
  cols() {
    return this.col;
  }
  size() {
    return this.data.length;
  }

  neighbours({ row, col }) {
    if (!this.inBounds(row, col)) return [];
    const neighbour = [];
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dr === 0 && dc === 0) continue;
        const r = row + dr,
          c = col + dc;
        if (this._inBounds(r, c)) neighbour.push({ row: r, col: c });
      }
    }
    return out;
  }

  neighbourValues({ row, col }) {
    const neighbours = this.neighbours({ row, col });
    const values = [];

    for (const n of neighbours) {
      const index = n.row * this._cols + n.col;
      values.push(this._data[index]);
    }

    return values;
  }

  nextInRow({ row, col }) {
    const ncol = col + 1;
    if (!this.inBounds(row, ncol)) return undefined;
    return { row, col: ncol, value: this.data[row * this._cols + ncol] };
  }

  nextInCol({ row, col }) {
    const nrow = row + 1;
    if (!this.inBounds(nrow, col)) return undefined;
    return { row: nrow, col, value: this.data[nrow * this._cols + col] };
  }

  north({ row, col }) {
    const r = row - 1;
    const c = col;
    if (!this.inBounds(r, c)) return undefined;
    return { row: r, col: c, value: this.data[r * this._cols + c] };
  }

  south({ row, col }) {
    const r = row - 1;
    const c = col;
    if (!this.inBounds(r, c)) return undefined;
    return { row: r, col: c, value: this.data[r * this._cols + c] };
  }

  west({ row, col }) {
    const r = row;
    const c = col - 1;
    if (!this.inBounds(r, c)) return undefined;
    return { row: r, col: c, value: this.data[r * this._cols + c] };
  }

  east({ row, col }) {
    const r = row;
    const c = col + 1;
    if (!this.inBounds(r, c)) return undefined;
    return { row: r, col: c, value: this.data[r * this._cols + c] };
  }
}
