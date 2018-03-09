class Board {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.x = canvas.width - canvas.height / 2;
    this.y = canvas.height / 2;
    this.w = 500;
    this.h = 500;
    this.cols = 10;
    this.rows = 10;
    this.scl = this.w / this.cols;

    this.gridColors =
    [[5, 5, 2, 2, 2, 2, 2, 2, 5, 5],
     [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
     [1, 5, 1, 1, 1, 2, 2, 2, 5, 3],
     [1, 5, 1, 1, 1, 2, 2, 2, 5, 3],
     [1, 5, 1, 1, 1, 2, 2, 2, 5, 3],
     [1, 5, 4, 4, 4, 3, 3, 3, 5, 3],
     [1, 5, 4, 4, 4, 3, 3, 3, 5, 3],
     [1, 5, 4, 4, 4, 3, 3, 3, 5, 3],
     [5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
     [5, 5, 4, 4, 4, 4, 4, 4, 5, 5]];

    this.grid =
    [[0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
     [0,  0,  6,  5,  4,  3,  2,  1,  0,  0],
     [0,  1,  16, 4,  20, 12, 2,  16, 6,  0],
     [0,  2,  2,  25, 8,  6,  25, 4,  5,  0],
     [0,  3,  12, 6,  36, 36, 8,  20, 4,  0],
     [0,  4,  20, 8,  36, 36, 6,  12, 3,  0],
     [0,  5,  4,  25, 6,  8,  25, 2,  2,  0],
     [0,  6,  16, 2,  12, 20, 4,  16, 1,  0],
     [0,  0,  1,  2,  3,  4,  5,  6,  0,  0],
     [0,  0,  0,  0,  0,  0,  0,  0,  0,  0]];
  }

  get cornerX() {
    return this.x - this.w / 2;
  }

  get cornerY() {
    return this.y - this.w / 2;
  }

  toPixelCoord(x, y) {
    return [this.cornerX + x * this.scl, this.cornerY + y * this.scl];
  }

  contains(i, j, x, y) {
    const tx = this.toPixelCoord(i, j)[0];
    const ty = this.toPixelCoord(i, j)[1];
    return x > tx && x < tx + this.scl && y > ty && y < ty + this.scl;
  }

  getCoord(num, col, center) {
    if (center) {
      let minx;
      let miny;
      let maxx;
      let maxy;

      if (col === 1) {
        minx = 2;
        miny = 2;
        maxx = 5;
        maxy = 5;
      } else if (col === 2) {
        minx = 5;
        miny = 2;
        maxx = 8;
        maxy = 5;
      } else if (col === 3) {
        minx = 5;
        miny = 5;
        maxx = 8;
        maxy = 8;
      } else if (col === 4) {
        minx = 2;
        miny = 5;
        maxx = 5;
        maxy = 8;
      }

      for (let i = minx; i < maxx; i++) {
        for (let j = miny; j < maxy; j++) {
          if (this.grid[i][j] === num) {
            return [i, j];
          }
        }
      }
    } else {
      let coord;
      let row;

      if (col === 1) {
        coord = 1;
        row = false;
      } else if (col === 2) {
        coord = 1;
        row = true;
      } else if (col === 3) {
        coord = 8;
        row = false;
      } else if (col === 4) {
        coord = 8;
        row = true;
      }

      for (let i = 2; i < 8; i++) {
        let condition;
        if (row) {
          condition = this.grid[coord][i] === num;
        } else {
          condition = this.grid[i][coord] === num;
        }

        if (condition) {
          if (col === 1) {
            return [i, 0];
          } else if (col === 2) {
            return [0, i];
          } else if (col === 3) {
            return [i, 9];
          } else if (col === 4) {
            return [9, i];
          }
        }
      }
    }
  }

  draw() {
    this.ctx.strokeStyle = 'black';

    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.ctx.save();

        let x = this.cornerX + i * this.scl;
        let y = this.cornerY + j * this.scl;
        this.ctx.strokeRect(x, y, this.scl, this.scl);

        if (this.gridColors[i][j] === 1) {
          this.ctx.fillStyle = 'navajowhite';
          this.ctx.fillRect(x, y, this.scl, this.scl);
        } else if (this.gridColors[i][j] === 2) {
          this.ctx.fillStyle = 'lemonchiffon';
          this.ctx.fillRect(x, y, this.scl, this.scl);
        } else if (this.gridColors[i][j] === 3) {
          this.ctx.fillStyle = '#cefdce';
          this.ctx.fillRect(x, y, this.scl, this.scl);
        } else if (this.gridColors[i][j] === 4) {
          this.ctx.fillStyle = 'lightcyan';
          this.ctx.fillRect(x, y, this.scl, this.scl);
        } else if (this.gridColors[i][j] === 5) {
          this.ctx.fillStyle = 'gainsboro';
          this.ctx.fillRect(x, y, this.scl, this.scl);
        }

        if (this.grid[i][j] > 0) {
          this.ctx.font = '32px Arial';
          this.ctx.fillStyle = 'black';
          this.ctx.textAlign = 'center';
          this.ctx.fillText(this.grid[i][j], x + this.scl / 2, y + 36);
        }

        this.ctx.restore();
      }
    }
  }
}
