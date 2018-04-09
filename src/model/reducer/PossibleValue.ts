import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction, SudokuActionData } from "../sudoku-action";
import { checkValue } from "../check";

export function togglePossibleValue(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
    const { value, row, col } = action.data;
    if (!checkValue(value)) {
        return state;
    }
    if (state.getIn(['rows', row, col, 'isOriginal'])) {
        return state;
    }
    return state.updateIn(['rows', row, col, 'possibleValues'], pv => {
        const index = pv.findIndex(n => n === value);
        if (index !== -1) {
            return pv.splice(index, 1);
        }
        return pv.push(value);
    });
}

export function removePossibleValueSameSquare(
    state: ImmutableSudokuState,
    data: SudokuActionData): ImmutableSudokuState {
    const { row, col, value } = data;
    const rows = new Array(3).fill(0).map((n, i) => i + 3 * Math.floor(row / 3));
    const cols = new Array(3).fill(0).map((n, i) => i + 3 * Math.floor(col / 3));
    let newState = state;
    rows.forEach(r => {
        cols.forEach(c => {
            newState = newState.updateIn(['rows', r, c, 'possibleValues'], pv => {
                const index = pv.indexOf(value);
                if (index !== -1) {
                    return pv.delete(index);
                }
                return pv;
            });
        })
    });
    return newState;
}

export function removePossibleValueSameRow(
    state: ImmutableSudokuState,
    data: SudokuActionData): ImmutableSudokuState {
    const { row, col, value } = data;
    const cols = new Array(9).fill(0).map((n, i) => i);
    let newState = state;
    cols.forEach(c => {
        newState = newState.updateIn(['rows', row, c, 'possibleValues'], pv => {
            const index = pv.indexOf(value);
            if (index !== -1) {
                return pv.delete(index);
            }
            return pv;
        });
    })
    return newState;
}

export function removePossibleValueSameCol(
    state: ImmutableSudokuState,
    data: SudokuActionData): ImmutableSudokuState {
    const { row, col, value } = data;
    const rows = new Array(9).fill(0).map((n, i) => i);
    let newState = state;
    rows.forEach(r => {
        newState = newState.updateIn(['rows', r, col, 'possibleValues'], pv => {
            const index = pv.indexOf(value);
            if (index !== -1) {
                return pv.delete(index);
            }
            return pv;
        });
    })
    return newState;
}