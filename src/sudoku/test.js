const SudokuSolver = require('./SudokuSolver');

console.time('sudoku');

let grid = SudokuSolver.generate();
console.log('grid', grid);
grid = SudokuSolver.carve(grid, 30);
console.log('grid', grid);

console.timeEnd('sudoku');