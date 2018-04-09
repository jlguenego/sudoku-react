import './SdkAtomicSquare.css';
import React, { Component } from 'react';
import { CommandMode } from './model/command-mode';

const a19 = new Array(9).fill(0).map((n, i) => i + 1);

const SdkAtomicSquare = props => {
  const { row, col, commandValue, commandMode } = props;
  const square = props.rows[row][col];

  function isHighlighted() {
    return false;
  }

  function onClick() {
    if (commandMode === CommandMode.REAL) {
      return props.setValue.bind(undefined, row, col, commandValue);
    }
    return props.togglePossibleValue.bind(undefined, row, col, commandValue);
  }

  return (
    <div className={'frame ' + (isHighlighted() ? 'hightlight' : '')} onClick={onClick()} >
      <div className={'value ' + (square.isOriginal ? 'is-original' : '')}>
        {square.value || ' '}
      </div>

      {square.possibleValues.map(n => <div key={n} className={'possible-value pos-' + n}>{n}</div>)}
    </div>
  );
};


export default SdkAtomicSquare;
