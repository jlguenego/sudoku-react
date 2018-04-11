import './SdkAtomicSquare.css';
import React from 'react';
import { CommandMode } from './model/command-mode';

const SdkAtomicSquare = props => {
  const { row, col, commandValue, commandMode } = props;
  const square = props.rows[row][col];

  const isHighlighted = props.isHighlighting &&
    (square.value > 0 || props.highlightRows[row] ||
    props.highlightCols[col] ||
    props.highlightSquare[Math.floor(row / 3)][Math.floor(col / 3)]);

  function onClick() {
    if (square.value > 0) {
      if (props.commandValue === square.value) {
        props.highlightToggle();
        return;
      }
      props.setCommandValue(square.value);
      props.highlightOn();
      return;
    }
    if (commandMode === CommandMode.REAL) {
      props.setValue(row, col, commandValue);
      props.highlightOn();
      return;
    }
    props.togglePossibleValue(row, col, commandValue);
  }

  return (
    <div className={'frame ' + (isHighlighted ? 'highlight' : '')} onClick={onClick} >
      <div className={'value ' + (square.isOriginal ? 'is-original' : '')}>
        {square.value || ' '}
      </div>

      {square.possibleValues.map(n => <div key={n} className={'possible-value pos-' + n}>{n}</div>)}
    </div>
  );
};


export default SdkAtomicSquare;
