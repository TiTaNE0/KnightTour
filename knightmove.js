const visitedArr = [];
const BOARD_SIZE = 8;
const STARTING_POSITION = [0, 0]; // constant declares START knight position

//CREATING BOARD BASE
for (let i = 0; i < BOARD_SIZE; i++) {
    visitedArr.push(new Array(BOARD_SIZE).fill(0));
}

// hardcoded all possible moves for start
const firstRowMove = [2, 1, -1, -2, -2, -1, 1, 2];
const firstColMove = [1, 2, 2, 1, -1, -2, -2, -1];

const [row, col] = STARTING_POSITION;

visitedArr[row][col] = 1;

knightMove(visitedArr, row, col, 1);

// checking move eligibility
function isValidMove(visitedArr, nextRow, nextCol) {
    if (
        (nextRow >= 0) && (nextRow < 8) && // setting VERTICAL boundaries
        (nextCol >= 0) && (nextCol < 8) && // setting HORIZONTAL boundaries
        (visitedArr[nextRow][nextCol] === 0) // if this particular cell hasn't been visited before
    ) {
        return true;
    }
    //console.log('Cant go to ' + nextRow + ', ' + nextCol)
    return false;
}

function knightMove(visitedArr, row, col, move) {
    if (move === 64) { // particular case then knight visited all spaces
        for (let i = 0; i < 8; i++) {
            let rowRow = '';
            for (let j = 0; j < 8; j++) {
                if (visitedArr[i][j].toString().length === 2) {
                    rowRow += (' ' + visitedArr[i][j]);
                } else {
                    rowRow += ('  ' + visitedArr[i][j]);
                }
            }
                console.log(rowRow);
            }
        return true;
    }
    else {
        for (let i = 0; i < firstColMove.length; i++) {
            const nextRow = row + firstRowMove[i]; // have a next move
            const nextCol = col + firstColMove[i]; // so we're trying to
            if (isValidMove(visitedArr, nextRow, nextCol)) { // checking if it's eligible move
                visitedArr[nextRow][nextCol] = ++move; // incrementing move and "placing" a figure on the board
                if (knightMove(visitedArr, nextRow, nextCol, move)) {
                    return true;
                }
                move--;
                visitedArr[nextRow][nextCol] = 0;
            }
        }
        return false;
    }
}