window.onload = () => {
  const ctx = game.getContext('2d');

  const board = new Board(game);
  const pieces = [];

  const ROLL_STATE = 0;
  const OPTION_STATE = 1;
  const MOVE_STATE = 2;

  let roll;
  let state = ROLL_STATE;

  let coord;
  let needToCorrect = false;

  let globalEvent;

  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      let col;

      if (i < 3 && j < 3) {
        col = 1;
      } else if (i < 3 && j >= 3) {
        col = 2;
      } else if (i >= 3 && j >= 3) {
        col = 3;
      } else if (i >= 3 && j < 3) {
        col = 4;
      }

      let x = 34 + i * 36;
      let y = 334 + j * 36;
      pieces.push(new Piece(game, x, y, col));
    }
  }

  function update() {
    ctx.fillStyle = 'paleturquoise';
    ctx.fillRect(0, 0, game.width, game.height);

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'gainsboro';
    ctx.strokeRect(50, 200, 50, 50);
    ctx.fillRect(50, 200, 50, 50);

    if (roll) {
      ctx.font = '32px Arial';
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.fillText(roll, 75, 236);
    }


    if (needToCorrect) {
      console.log(board.contains(0, 0, board.cornerX + 25, board.cornerY + 25));

      // if (!board.contains(coord[0], coord[1], globalEvent.offsetX, globalEvent.offsetY)) {
      //   ctx.fillStyle = 'red';
      //   ctx.fillRect(coord[0], coord[1], 50, 50);
      // }
    }

    board.draw();
    pieces.forEach(piece => piece.draw());

    requestAnimationFrame(update);
  }

  game.onmousedown = () => {
    if (state === ROLL_STATE) {
      roll = Math.floor(Math.random() * 6) + 1;

      state = MOVE_STATE;
    } else if (state === MOVE_STATE) {
      pieces.forEach(piece => {
        if (piece.contains(event.offsetX, event.offsetY)) {
          piece.dragging = true;
        }
      });

      game.onmousemove = event => {
        globalEvent = event;

        pieces.forEach(piece => {
          if (piece.dragging) {
            piece.move(event.offsetX, event.offsetY);
          }
        });
      }

      state = ROLL_STATE;
    }
  }

  game.onmouseup = () => {
    pieces.forEach(piece => {
      if (piece.dragging) {
        coord = board.getCoord(roll, piece.col, false);
        coord = board.toPixelCoord(coord[0], coord[1]);
        if (board.contains(coord[0], coord[1], globalEvent.offsetX, globalEvent.offsetY)) {
          piece.move(coord[0] + board.scl / 2, coord[1] + board.scl / 2);
        } else {
        }
      }
    });

    needToCorrect = true;

    pieces.forEach(piece => {
      piece.dragging = false;
    });

    game.onmousemove = undefined;
  }

  update();
}
