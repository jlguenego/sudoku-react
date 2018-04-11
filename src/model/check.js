import { getGrid, getSquare } from "./grid";

export function checkValue(value) {
    if (value < 0 || value > 9) {
        return false;
    }
    if (!Number.isInteger(value)) {
        return false;
    }
    return true;
}

export function applySudokuRules(state, data) {
    const grid = getGrid(state);
    if (checkRow(grid, data) === false) {
        return state.updateIn(['errors'], errors => errors.push('checkRow'));
    }
    if (checkCol(grid, data) === false) {
        return state.updateIn(['errors'], errors => errors.push('checkCol'));
    }
    if (checkSquare(grid, data) === false) {
        return state.updateIn(['errors'], errors => errors.push('checkSquare'));
    }
    if (checkSolution(state.get('solutionStr', ''), data) === false) {
        return state.updateIn(['errors'], errors => errors.push('checkSolution'));
    }
    return state;
}

function checkRow(grid, data) {
    const { value, row } = data;
    const sudokuRow = grid[row];
    const result = (sudokuRow.find(n => n === value) === undefined);
    return result;
}
function checkCol(grid, data) {
    const { value, col } = data;
    const sudokuCol = grid.map(row => row[col]);
    const result = (sudokuCol.find(n => n === value) === undefined);
    return result;
}
function checkSquare(grid, data) {
    const { value, row, col } = data;
    const sudokuSquare = getSquare(grid, row, col);
    const result = sudokuSquare.find(row => row.find(v => v === value) !== undefined) === undefined;
    return result;
}

function checkSolution(solutionStr, data) {
    const { value, row, col } = data;
    if (solutionStr.length !== 81) {
        return false;
    }
    const c = solutionStr.charAt((row * 9) + col);
    return +c === value;
}
