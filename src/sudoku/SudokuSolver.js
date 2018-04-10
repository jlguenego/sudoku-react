const backtracker = require('./backtracker');

const a19 = () => new Array(9).fill(0).map((n, i) => i + 1);

function popRand(array) {
    if (array.length === 0) {
        throw new Error('cannot pop from an empty array', array);
    }
    const index = Math.floor(Math.random() * array.length);
    const result = array[index];
    array.splice(index, 1);
    return result;
}

function initGrid() {
    return new Array(9).fill(0).map(() => new Array(9).fill(0));
}

function getXY(n) {
    return {
        x: Math.floor(n / 9),
        y: n % 9
    }
}

function checkGrid(grid, x, y) {
    return checkRow(grid, x, y) && checkCol(grid, x, y) && checkSquare(grid, x, y);
}

function checkRow(grid, x, y) {
    return grid[x].indexOf(grid[x][y]) === y;
}

function checkCol(grid, x, y) {
    const column = grid.map(row => row[y]);
    return column.indexOf(grid[x][y]) === x;
}

function checkSquare(grid, x, y) {
    const n = grid[x][y];
    const i = Math.floor(x / 3);
    const j = Math.floor(y / 3);
    const square = grid.slice(i * 3, i * 3 + 3).map(row => row.slice(j * 3, j * 3 + 3));
    // console.log('square', square);
    square[x % 3][y % 3] = 0;
    const flat = square.reduce((acc, row) => acc.concat(row), []);
    return flat.indexOf(n) === -1;
}




class SudokuSolver {

    static generate() {
        const config = {
            getSolutionStructure: initGrid,
            universe: new Array(9).fill(0).map(() => new Array(9).fill(0).map(a19)),
            getPossibilities: (universe, i) => {
                const { x, y } = getXY(i);
                return universe[x][y];
            },
            resetPossibilities: (possibilities) => {
                for (let i = 0; i < 9; i++) {
                    possibilities.push(i+1);
                }
            },
            resetSolution: (solution, i) => {
                const { x, y } = getXY(i);
                solution[x][y] = 0;
            },
            setSolution: (solution, i, n) => {
                const { x, y } = getXY(i);
                solution[x][y] = n;
            },
            checkSolution: (solution, i) => {
                const { x, y } = getXY(i);
                return checkGrid(solution, x, y);
            },
            pop: (possibilities) => {
                return popRand(possibilities);
                // return possibilities.shift();
            },
            strategy: 'find-first',
            max: 2,
            length: 81,
        };
        return backtracker(config);
    }

    
}

const grid = SudokuSolver.generate();
console.log('grid', grid);