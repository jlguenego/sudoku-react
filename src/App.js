import React, { Component } from 'react';

import './App.css';
import './SdkGlobalSquare.css';
import './SdkMiddleSquare.css';
import './SdkAtomicSquare.css';
import './SdkCommand.css';

import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';

import { sudokuReducer } from './model/reducer';
import { initialState } from './model/sudoku-state';
import { ActionType } from './model/action-type';
import { CommandMode } from './model/command-mode';

import SdkAtomicSquare from './SdkAtomicSquare';

const store = createStore(sudokuReducer, initialState);

const a19 = new Array(9).fill(0).map((n, i) => i + 1);

const SdkMiddleSquare = props => (
  <ul className="middle-square">
    {[0, 1, 2].map(i => (
      <li key={i}>
        {[0, 1, 2].map(j => {
          return <SdkAtomicSquare key={j} {...props} row={props.row + i} col={props.col + j} />;
        })}
      </li>
    ))}
  </ul>
);

const SdkGlobalSquare = props => (
  <ul className="global-square">
    {[0, 3, 6].map(i => (
      <li key={i}>
        {[0, 3, 6].map(j => <SdkMiddleSquare key={j} {...props} row={i} col={j} />)}
      </li>
    ))}
  </ul>
);

const SdkCommand = props => {
  const className = 'digit '
    + (props.commandMode === 'assistant' ? 'assistant' : '');
  const label = props.commandMode === CommandMode.REAL ? 'REAL MODE' : 'ASSISTANT MODE';
  const otherMode = props.commandMode === CommandMode.REAL ? CommandMode.ASSISTANT : CommandMode.REAL;

  return (
    <React.Fragment>
      <div>
        {a19.map(i => (
          <button
            className={className + (i === props.commandValue ? 'active' : '')}
            key={i}
            onClick={props.setCommandValue.bind(undefined, i)}>
            {i}
          </button>
        ))}

      </div>
      <div>
        <button className={props.commandMode} onClick={props.setCommandMode.bind(undefined, otherMode)}>{label}</button>
        <button onClick={console.log('click')}>NEW SUDOKU</button >
      </div >

      <button onClick={console.log('click')}>Log</button>
      <select name="difficulty">
        <option value="0">Easy</option>
        <option value="1">Medium</option>
        <option value="2">Hard</option>
      </select >
    </React.Fragment >

  );
};

const SdkSudoku = props => (
  <React.Fragment>
    <SdkGlobalSquare {...props} />
    <SdkCommand {...props} />
  </React.Fragment>
);

const Root = props => {
  console.log('props', props);
  return (
    <React.Fragment>
      <header>Sudoku</header>
      <main>
        <div className="container">
          <h1>Sudoku</h1>
          <div className="text-center">
            <SdkSudoku {...props} />
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};



const mapStateToProps = state => {
  console.log('state', state);
  return {
    commandMode: state.commandMode,
    commandValue: state.commandValue,
    errors: state.errors.toArray(),
    rows: state.rows.toJS(),
    highlightRows: state.highlightRows.toJS(),
    highlightCols: state.highlightCols.toJS(),
    highlightSquare: state.highlightSquare.toJS(),
  };
};

const mapDispatchToProps = dispatch => ({
  setValue: (row, col, value) => dispatch({
    type: ActionType.SET_VALUE,
    data: { row, col, value }
  }),
  setCommandValue: (value) => dispatch({
    type: ActionType.SET_COMMAND_VALUE,
    data: { value }
  }),
  setCommandMode: (value) => dispatch({
    type: ActionType.SET_COMMAND_MODE,
    data: { value }
  }),
  togglePossibleValue: (row, col, value) => dispatch({
    type: ActionType.TOGGLE_POSSIBLE_VALUE,
    data: { row, col, value }
  }),
  highlightToggle: () => dispatch({
    type: ActionType.HIGHLIGHT_TOGGLE,
    data: { }
  }),
  highlightOn: () => dispatch({
    type: ActionType.HIGHLIGHT_ON,
    data: { }
  }),
});

// note: connect is a Higher-order function
const Container = connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    )
  }
}

export default App;
