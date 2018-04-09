import React, { Component } from 'react';
import './App.css';

const SdkMiddleSquare = props => (
  <div>SdkMiddleSquare {props.row} {props.col}</div>
);

const SdkGlobalSquare = () => (
  <ul>
    {[0, 3, 6].map(i => (
      <li key={i}>
        {[0, 3, 6].map(j => <SdkMiddleSquare key={j} row={i} col={j} />)}
      </li>
    ))}
  </ul >
);

const SdkCommand = () => (
  <div>SdkCommand</div>
);

const SdkSudoku = () => (
  <React.Fragment>
    <SdkGlobalSquare />
    <SdkCommand />
  </React.Fragment>
);

const Root = () => (
  <React.Fragment>
    <header>Sudoku</header>
    <main>
      <div class="container">
        <h1>Sudoku</h1>
        <div class="text-center">
          <SdkSudoku />
        </div>
      </div>
    </main>
  </React.Fragment>
);

class App extends Component {
  render() {
    return <Root />;
  }
}

export default App;
