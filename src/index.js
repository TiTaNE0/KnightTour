import './index.scss';
import DIRECTIONS from './utils/directions';
import KnightFigure from './assets/knight.svg';
import {kx, ky, width, height, cellCount, delay } from './utils/board_conts';

let knightPos = {
  x: 0,
  y: 0,
};

let step = width / cellCount;
let lastTime = 0;
let visited = [];
let path = [];

const canvas = document.createElement('canvas');
canvas.id = 'cv';
canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext('2d');
document.getElementById('board').appendChild(canvas);

const Knight = document.createElement('img');
Knight.classList.add('knight');
Knight.src = KnightFigure;
Knight.onload = KnightFigure;

document.getElementById('board').addEventListener('click', () => {
  startTour();
});

drawBoard();

function startTour() {
  let wait = delay;
  step = width / cellCount;
  path = [];
  let jumps = 1;
  let success = true;
  visited = [];
  const cnt = cellCount * cellCount;
  for (let a = 0; a < cnt; a++) {
    visited.push(false);
  }

  knightPos = {
    x: (kx > cellCount || kx < 0) ? Math.floor(Math.random() * cellCount) : kx,
    y: (ky > cellCount || ky < 0) ? Math.floor(Math.random() * cellCount) : ky,
  };

  const mainLoop = (time = 0) => {
    const dif = time - lastTime;
    lastTime = time;
    wait -= dif;
    if (wait > 0) {
      requestAnimationFrame(mainLoop);
      return;
    }
    wait = delay;
    let moves;
    if (success) {
      moves = minimalOnwardMoves(knightPos);
    } else {
      if (path.length > 0) {
        path = path[path.length - 1];
        moves = path.m;
        if (moves.length < 1)
          path.pop();
        knightPos = path.pos;
        visited[knightPos.x + knightPos.y * cellCount] = false;
        jumps--;
        wait = delay;
      } else {
        return;
      }
    }

    drawBoard();
    ctx.fillStyle = '#000';
    ctx.drawImage(Knight, knightPos.x * step + 15, knightPos.y * step, 50, 75);
    if (moves.length < 1) {
      if (jumps === cellCount * cellCount) {
        return;
      } else {
        success = false;
      }
    } else {
      visited[knightPos.x + knightPos.y * cellCount] = true;
      const move = moves.pop();
      path.push({
        pos: knightPos,
        m: moves,
      });
      knightPos = move.pos;
      success = true;
      jumps++;
    }
    requestAnimationFrame(mainLoop);
  };
  mainLoop();
}

function drawBoard() {
  let a = false, xx, yy;
  for (let y = 0; y < cellCount; y++) {
    for (let x = 0; x < cellCount; x++) {
      if (a) {
        ctx.fillStyle = '#a0754c';
      } else {
        ctx.fillStyle = '#ffffff';
      }
      a = !a;
      xx = x * step;
      yy = y * step;
      ctx.fillRect(xx, yy, xx + step, yy + step);
    }
    if (!(cellCount & 1)) a = !a;
  }
  if (path.length) {
    const s = step >> 1;
    ctx.lineWidth = 3;
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.moveTo(step * knightPos.x + s, step * knightPos.y + s);
    let a, b, v = path.length - 1;
    while (v > -1) {
      a = path[v].pos.x * step + s;
      b = path[v].pos.y * step + s;
      ctx.lineTo(a, b);
      ctx.arc(a, b, 2, 0, 2 * Math.PI);
      ctx.fillStyle = '#ff0000';
      v--;
    }
    ctx.strokeStyle = '#ff0000';
    ctx.stroke();
  }
}

function createMoves(pos) {
  const possibles = [];
  let x = 0,
    y = 0,
    mov = 0,
    len = DIRECTIONS.length;
  while (mov < len) {
    x = pos.x + DIRECTIONS[mov].x;
    y = pos.y + DIRECTIONS[mov].y;
    if (x > -1 && x < cellCount && y > -1 && y < cellCount && !visited[x + y * cellCount]) {
      possibles.push({
        x,
        y,
      });
    }
    mov++;
  }
  return possibles;
}

function minimalOnwardMoves(pos) {
  const possibles = createMoves(pos);
  if (possibles.length < 1) return [];
  const moves = [];
  for (let p = 0; p < possibles.length; p++) {
    let ps = createMoves(possibles[p]);
    moves.push({
      len: ps.length,
      pos: possibles[p],
    });
  }
  moves.sort((a, b) => {
    return b.len - a.len;
  });
  return moves;
}
