const a19 = new Array(9).fill(0).map((n, i) => i + 1);

function rand(includes) {
    if (includes === undefined) {
        includes = a19;
    }
    if (includes.length === 0) {
        throw new Error('cannot have includes as empty array', includes);
    }
    const index = Math.floor(Math.random() * includes.length);
    const result = includes[index];
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
    return checkRow(grid, x, y) && checkCol(grid, x, y);
}

function checkRow(grid, x, y) {
    return grid[x].indexOf(grid[x][y]) === y;
}

function checkCol(grid, x, y) {
    const column = grid.map(row => row[y]);
    return column.indexOf(grid[x][y]) === x;
}



class SudokuSolver {

    static generate() {
        const grid = initGrid();

        let i = 0;

        let includes = new Array(9).fill(0).map((n, i) => i + 1);
        while (true) {
            let n = rand(includes);
            const { x, y } = getXY(i);
            console.log('n', n);
            if (n === undefined) {
                throw new Error();
            }
            grid[x][y] = n;
            console.log('grid', grid);
            const status = checkGrid(grid, x, y);
            if (status) {
                includes = new Array(9).fill(0).map((n, i) => i + 1);
                i++;
            } else {
                includes.splice(includes.indexOf(n), 1);
                if (includes.length === 0) {
                    grid[x][y] = 0;
                    i--;
                }
                continue;
            }
            if (i === 81) {
                break;
            }
        }

        console.log('grid', grid);
    }
}

SudokuSolver.generate();