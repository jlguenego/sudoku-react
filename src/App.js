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

const store = createStore(sudokuReducer, initialState);

const a19 = new Array(9).fill(0).map((n, i) => i + 1);

const SdkAtomicSquare = props => {
  const { row, col, commandValue } = props;
  const square = props.rows[row][col];

  return (
    <div className={'frame ' + (square.isHighlighted ? 'hightlight' : '')} onClick={props.setValue.bind(undefined, row, col, commandValue)} >
      <div className={'value ' + (square.isOriginal ? 'is-original' : '')}>
        {square.value || ' '}
      </div>

      {square.possibleValues.map(n => <div key={n} className={'possible-value pos-' + n}>{n}</div>)}
    </div>
  );
};

const SdkMiddleSquare = props => (
  <ul className="middle-square">
    {[0, 1, 2].map(i => (
      <li key={i}>
        {[0, 1, 2].map(j => {
          console.log('i=', i);
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
    + (props.mode === 'assistant' ? 'assistant' : '');
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
