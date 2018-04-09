import './sudoku.js';

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

    const sudoku = window['sudoku'];

    const array = ['easy', 'medium', 'hard'];

    const s = sudoku.generate(array[difficulty]);
    const sol = sudoku.solve(s);

    const str = s.replace(/[.]/g, '0');

    const solutionStr = sol.replace(/[.]/g, '0');
    return makeImmutableSudokuState(str, solutionStr);
}

export const initialState = newSudoku();

