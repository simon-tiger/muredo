class Piece {
  constructor(canvas, x, y, col) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.move(x, y);
    this.dragging = false;
    this.r = 15;
    this.col = col;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  contains(x, y) {
    const diffXSq = Math.pow(x - this.x, 2);
    const diffYSq = Math.pow(y - this.y, 2);
    const dist = Math.sqrt(diffXSq + diffYSq);
    return dist < this.r;
  }

  draw() {
    if (this.col === 1) {
      this.ctx.fillStyle = 'navajowhite';
    } else if (this.col === 2) {
      this.ctx.fillStyle = 'lemonchiffon';
    } else if (this.col === 3) {
      this.ctx.fillStyle = '#cefdce';
    } else if (this.col === 4) {
      this.ctx.fillStyle = 'lightcyan';
    }

    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.fill();
  }
}
