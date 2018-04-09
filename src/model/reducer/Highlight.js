import { isSquareContaining, getGrid } from '../grid';
import { fromJS, List } from 'immutable';

const false9 = new Array(9).fill(false);
const false3x3 = new Array(3).fill(new Array(3).fill(false));

export class Highlight {

    constructor(state) {
        console.log('Highlight state', state);
        this.state = state;
    }

    toggle() {
        this.state = this.state.set('isHighlighting', !this.state.get('isHighlighting'));
        return this.refresh();
    }

    on() {
        this.state = this.state.set('isHighlighting', true);
        return this.refresh();
    }

    refresh() {
        const grid = getGrid(this.state);
        this.state = this.reset();
        if (this.state.get('commandValue') === 0) {
            return this.state;
        }

        const highlightRows = false9.map(
            (n, i) => grid[i].find(n => n === this.state.commandValue) !== undefined);
        const highlightCols = false9.map(
            (n, i) => grid.map(row => row[i]).find(n => n === this.state.commandValue) !== undefined);
        console.log('highlightRows', highlightRows);
        console.log('highlightCols', highlightCols);
        const highlightSquare = false3x3.map(
            (row, i) => row.map((col, j) => isSquareContaining(grid, i, j, this.state.commandValue))
        );
        console.log('highlightSquare', highlightSquare);
        return this.state.mergeDeep({
            highlightRows,
            highlightCols,
            highlightSquare
        });
    }

    reset() {
        return this.state.mergeDeep({
            highlightRows: false9,
            highlightCols: false9,
            highlightSquare: false3x3
        });
    }

}