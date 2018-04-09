import { ImmutableSudokuState } from "../sudoku-state";
import { SudokuAction } from "../sudoku-action";

export function setCommandValue(state: ImmutableSudokuState, action: SudokuAction): ImmutableSudokuState {
    const newState = state.set('commandValue', action.data.value);
    return newState;
}

