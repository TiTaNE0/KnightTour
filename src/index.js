import './index.scss';
import KnightFigure from './assets/knight.svg';

console.log("LOAD OK");

const board = document.querySelector(".board");
const boardLetters = document.querySelector(".letters");
const boardNumbers = document.querySelector(".numbers");


const letters = ["a", "b", "c", "d", "e", "f", "g", "h"]
let index = 0;
let black = false;
let num = 1;

let pX = 10;
let pY = 0;

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const canvas2 = document.getElementById('redline');
const ctx2 = canvas2.getContext('2d');

const img = document.createElement('img');
img.src = KnightFigure;
img.onload = KnightFigure;

for (let letter in letters) {
    let letter = document.createElement("li");
    letter.textContent = letters[letter];
    boardLetters.appendChild(letter);
    let numbers = document.createElement("li");
    numbers.textContent = num++;
    boardNumbers.appendChild(numbers);
}

for (let i = 1; i <= 64; i++) {
    const square = document.createElement("div");
    if (black) {
        square.classList.add("square");
        square.classList.add("black");
        index++;
        black = !black;
    } else {
        square.classList.add("square");
        square.classList.add("white");
        index++;
        black = !black;
    }
    board.appendChild(square);
    if (index === 8) {
        black = !black;
        index = 0;
    }
}

img.addEventListener('load', () => {
    window.requestAnimationFrame(knightMove);
});

function knightMove() {
    ctx.clearRect(pX, pY, 50, 75);
    ctx.drawImage(img, pX, pY, 50, 75);
    pX += 75;
    pY += 150;
    window.requestAnimationFrame(knightMove);
}


// setInterval(() => {
//     setInterval(() => {
//         ctx.clearRect(pX, pY, 600, 600);
//     }, 100);
//     ctx.drawImage(img, pX, pY, 50, 75);
//     pX+=150;
//     pY+=75;
// }, 500);