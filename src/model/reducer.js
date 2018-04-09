import { initialState } from "./sudoku-state";
import { ActionType } from "./action-type";

import { set } from "./reducer/set";
import { setCommandValue } from "./reducer/setCommandValue";
import { togglePossibleValue } from "./reducer/PossibleValue";

import { Highlight } from './reducer/Highlight';

export function sudokuReducer(state = initialState, action) {
    switch (action.type) {

        case ActionType.SET_VALUE:
            const newState = set(state, action);
            return newState;

        // case ActionType.REMOVE_VALUE:
        //     const data = { value: 0, ...action.data };
        //     return set(state, { ...action, data });

        case ActionType.SET_COMMAND_VALUE:
            return setCommandValue(state, action);

        case ActionType.SET_COMMAND_MODE:
            return state.set('commandMode', action.data.value);

        case ActionType.TOGGLE_POSSIBLE_VALUE:
            return togglePossibleValue(state, action);

        case ActionType.HIGHLIGHT_TOGGLE:
            return new Highlight(state).toggle();

        case ActionType.HIGHLIGHT_ON:
            return new Highlight(state).on();


        // case ActionType.GENERATE_NEW_SUDOKU:
        //     return newSudoku(action.data.difficulty);

        default:
            return state;
    }
}
