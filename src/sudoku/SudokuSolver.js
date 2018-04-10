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

function makeRandomGrid(grid) {
    grid.forEach((row, i) => {
        row.forEach((n, j) => {
            grid[i][j] = rand();
        });
    });
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
        };
        return SudokuSolver.backtracker(config);
    }

    static backtracker(config) {
        console.time('backtracking');
        const solution = config.getSolutionStructure();

        let i = 0;

        let universe = config.universe;
        while (true) {
            if (i === -1) {
                throw new Error('it seems that the backtracking cannot find a solution.');
            }

            const { x, y } = getXY(i);
            if (universe[x][y].length === 0) {
                solution[x][y] = 0;
                universe[x][y] = a19();
                i--;
                continue;
            }

            let n = popRand(universe[x][y]);
            solution[x][y] = n;

            const status = checkGrid(solution, x, y);
            if (status) {
                i++;
            } else {
                continue;
            }
            if (i === 81) {
                break;
            }
        }
        console.timeEnd('backtracking');
        return solution;
    }
}

const grid = SudokuSolver.generate();
console.log('grid', grid);