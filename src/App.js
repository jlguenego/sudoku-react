import React, { Component } from 'react';
import './App.css';

const SdkSudoku = () => (
  <div>SdkSudoku</div>
);

const Root = () => (
  <React.Fragment>
    <header>Sudoku</header>
    <main>
      <div class="container">
        <h1>Sudoku</h1>
        <div class="text-center">
          <SdkSudoku/>
        </div>
      </div>
    </main>

  </React.Fragment>
);


class App extends Component {
  render() {
    return (
      <Root />
    );
  }
}

export default App;
