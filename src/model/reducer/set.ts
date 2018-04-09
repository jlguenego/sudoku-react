import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction } from "../sudoku-action";
import { checkValue, applySudokuRules } from "../check";
import { removePossibleValueSameSquare, removePossibleValueSameRow, removePossibleValueSameCol } from "./PossibleValue";

export function set(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
    const { row, col, value } = action.data;
    if (!checkValue(value)) {
        return state;
    };
    if (state.getIn(['rows', row, col, 'isOriginal']) === true) {
        return state;
    }
    if (value) {
        const newState = applySudokuRules(state, action.data);
        if (newState !== state) {
            window.alert('Baaahhhh! Error ! Try again !!!');
            return newState;
        }
    }
    let newState = state.updateIn(['rows', row, col, 'value'], v => {
        return value;
    });
    newState = newState.updateIn(['rows', row, col, 'possibleValues'], v => v.clear());

    newState = removePossibleValueSameSquare(newState, action.data);
    newState = removePossibleValueSameRow(newState, action.data);
    newState = removePossibleValueSameCol(newState, action.data);
    return newState;
}