import './sudoku.js';

import { Square, ImmutableSquare } from "./square";
import { CommandMode } from "../model/command-mode.enum";

import { Record, List, fromJS } from 'immutable';
import { DifficultyEnum } from './difficulty.enum.js';

interface SudokuStateProps {
    rows: List<List<ImmutableSquare>>;
    commandValue: number;
    commandMode: CommandMode;
    errors: List<string>;
    solutionStr: string;
}

export type ImmutableSudokuState = Record<SudokuStateProps>;
export type ImmutableSudokyStateFactory = Record.Factory<SudokuStateProps>;


export const SudokuState: ImmutableSudokyStateFactory = Record({
    rows: List<List<ImmutableSquare>>([]),
    commandValue: 0,
    commandMode: CommandMode.REAL,
    errors: List<string>([]),
    solutionStr: '',
});


function makeImmutableSudokuState(str: string, solutionStr: string): ImmutableSudokuState {
    if (!str || str.length !== 81) {
        throw new Error(`Cannot initiate from an not well formatted string: ${str}`);
    }
    const rows = [];
    let i = 0, j = 0;
    let row;
    for (let c of str) {
        if (j === 0) {
            row = [];
            rows.push(row);
        }
        const d = +c;
        const square: ImmutableSquare = new Square({ value: +c, isOriginal: (+c !== 0) });
        // console.log('square', square);
        row.push(square);
        if (j === 8) {
            j = 0;
            i++;
        } else {
            j++;
        }
    }
    const immutableRows = fromJS(rows);
    console.log('immutableRows', immutableRows);
    return SudokuState({ rows: immutableRows, solutionStr });
}

export function newSudoku(difficulty: DifficultyEnum = DifficultyEnum.EASY) {

    const sudoku = window['sudoku'];

    const array = ['easy', 'medium', 'hard'];

    const s = sudoku.generate(array[difficulty]);
    const sol = sudoku.solve(s);

    const str = s.replace(/[.]/g, '0');

    const solutionStr = sol.replace(/[.]/g, '0');
    return makeImmutableSudokuState(str, solutionStr);
}

export const initialState: ImmutableSudokuState = newSudoku();

