const backtracker = require('./backtracker');
const HumanSolver = require('./HumanSolver');

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

// function rand() {
//     return Math.floor(Math.random() * 9);
// }

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
    square[x % 3][y % 3] = 0;
    const flat = square.reduce((acc, row) => acc.concat(row), []);
    return flat.indexOf(n) === -1;
}

const config = {
    getSolutionStructure: initGrid,
    universe: new Array(9).fill(0).map(() => new Array(9).fill(0).map(a19)),
    getPossibilities: (universe, i) => {
        const { x, y } = getXY(i);
        return universe[x][y];
    },
    resetPossibilities: (possibilities, i, universeCopy) => {
        const { x, y } = getXY(i);
        const origPossibilities = universeCopy[x][y];
        origPossibilities.forEach(n => possibilities.push(n));
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

class SudokuSolver {

    static generate() {
        config.universe = new Array(9).fill(0).map(() => new Array(9).fill(0).map(a19));
        return backtracker(config);
    }

    static carve(grid, total) {
        let g;
        let i = 0;
        while (true) {
            g = JSON.parse(JSON.stringify(grid));
            const array = new Array(81).fill(0).map((n, i) => ({ r: Math.floor(i / 9), c: i % 9 }));
            for (let i = 0; i < total; i++) {
                const { r, c } = popRand(array);
                g[r][c] = 0;
            }
            if (SudokuSolver.checkOneSolution(g)) {
                break;
            }
            i++;
        }
        console.log('found in %d iterations', i);
        return g;

    }

    static checkOneSolution(grid) {

        const universe = grid.map(row => row.map(col => {
            if (col === 0) {
                return new Array(9).fill(0).map((n, i) => i + 1);
            }
            return [col];
        }));
        SudokuSolver.humanSolve(universe);
        SudokuSolver.humanSolve(universe);
        SudokuSolver.humanSolve(universe);
        SudokuSolver.humanSolve(universe);
        const config2 = {
            ...config,
            universe,
            strategy: 'find-all',
            max: 2,
            length: 81,
            // pop: (possibilities) => {
            //     return possibilities.shift();
            // },
        };
        const result = backtracker(config2).length === 1;
        return result;
    }

    static humanSolve(universe) {
        console.log('universe level before', HumanSolver.getLevel(universe));
        HumanSolver.removeRowDuplicate(universe);
        HumanSolver.removeColDuplicate(universe);
        HumanSolver.removeSquareDuplicate(universe);
        console.log('universe level after', HumanSolver.getLevel(universe));        
    }

    static btcarve(grid, total) {
        // perform a backtracking on carve.
        const config = {
            getSolutionStructure: JSON.parse(JSON.stringify(grid)),
            universe: null,
            getPossibilities: (universe, i) => {
                const { x, y } = getXY(i);
                return universe[x][y];
            },
            resetPossibilities: (possibilities, i, universeCopy) => {
                const { x, y } = getXY(i);
                const origPossibilities = universeCopy[x][y];
                origPossibilities.forEach(n => possibilities.push(n));
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
            length: total,
        };
        config.universe = new Array(9).fill(0).map(() => new Array(9).fill(0).map(a19));
        return backtracker(config);
    }


}

module.exports = SudokuSolver;

