import React, { Component } from 'react';
import './App.css';
import './SdkGlobalSquare.css';
import './SdkMiddleSquare.css';
import './SdkAtomicSquare.css';

const a19 = new Array(9).fill(0).map((n, i) => i + 1);

const SdkAtomicSquare = props => {


  return (
    <div className={'frame ' + (props.isHighlighted ? 'hightlight' : '')} onClick={console.log('click')} >
      <div className={'value ' + (props.isOriginal ? 'original' : '')}>
        {props.value || ' '}
      </div>

      {a19.map(n => <div className={'possible-value pos-' + n}>{n}</div>)}
    </div>
  );
};

const SdkMiddleSquare = props => (
  <ul className="middle-square">
    {[0, 1, 2].map(i => (
      <li key={i}>
        {[0, 1, 2].map(j => <SdkAtomicSquare key={j} row={props.row + i} col={props.col + j} {...props} />)}
      </li>
    ))}
  </ul>
);

const SdkGlobalSquare = props => (
  <ul className="global-square">
    {[0, 3, 6].map(i => (
      <li key={i}>
        {[0, 3, 6].map(j => <SdkMiddleSquare key={j} row={i} col={j} {...props} />)}
      </li>
    ))}
  </ul>
);

const SdkCommand = props => {
  const className = 'digit '
    + (props.mode === 'assistant' ? 'assistant' : '');

  return (
    <React.Fragment>
      <div>
        {a19.map(i => (
        <button 
        className={className + (i === props.value ? 'active' : '')} 
        key={i} 
        onClick={console.log('click')}>
        { i }
        </button>
      ))}

      </div>
      <div>
        <button class="real" onClick={console.log('click')}>REAL MODE</button>
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

const Root = props => (
  <React.Fragment>
    <header>Sudoku</header>
    <main>
      <div class="container">
        <h1>Sudoku</h1>
        <div class="text-center">
          <SdkSudoku {...props} />
        </div>
      </div>
    </main>
  </React.Fragment>
);

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return <Root {...this.state} />;
  }
}

export default App;
