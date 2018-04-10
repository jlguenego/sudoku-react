import SudokuSolver from '../sudoku/SudokuSolver';

import { Square } from "./square";
import { CommandMode } from "../model/command-mode";

import { Record, List, fromJS } from 'immutable';
import { DifficultyEnum } from './difficulty.js';

const false9 = new Array(9).fill(false);
const false3x3 = new Array(3).fill(new Array(3).fill(false));

export const SudokuState = Record({
    rows: List([]),
    commandValue: 0,
    commandMode: CommandMode.REAL,
    errors: List([]),
    solutionStr: '',
    isHighlighting: false,
    highlightRows: List(false9),
    highlightCols: List(false9),
    highlightSquare: fromJS(false3x3),
});


function makeImmutableSudokuState(str, solutionStr) {
    if (!str || str.length !== 81) {
        throw new Error(`Cannot initiate from an not well formatted string: ${str}`);
    }
    const rows = [];
    let j = 0;
    let row;
    for (let c of str) {
        if (j === 0) {
            row = [];
            rows.push(row);
        }
        const square = new Square({ value: +c, isOriginal: (+c !== 0) });
        // console.log('square', square);
        row.push(square);
        if (j === 8) {
            j = 0;
        } else {
            j++;
        }
    }
    const immutableRows = fromJS(rows);
    console.log('immutableRows', immutableRows);
    return SudokuState({ rows: immutableRows, solutionStr });
}

export function newSudoku(difficulty = DifficultyEnum.EASY) {

    let n = 30;

    if (difficulty == DifficultyEnum.MEDIUM) {
        n = 40;
    }
    if (difficulty == DifficultyEnum.HARD) {
        n = 45;
    }


    console.log('hard', DifficultyEnum.HARD);
    console.log('starting generating new sudoku', n, difficulty);
    const grid1 = SudokuSolver.generate();
    console.log('carving sudoku');
    const grid2 = SudokuSolver.carve(grid1, n);
    console.log('sudoku generated.');

    const solutionStr = grid1.map(n => n.join('')).join('');
    const str = grid2.map(n => n.join('')).join('');

    return makeImmutableSudokuState(str, solutionStr);
}

export const initialState = newSudoku();

