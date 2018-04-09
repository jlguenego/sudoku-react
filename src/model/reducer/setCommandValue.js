
export function setCommandValue(state, action) {
    const newState = state.set('commandValue', action.data.value);
    return newState;
}

