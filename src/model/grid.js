
export function getGrid(state) {
    const grid = state.get('rows', undefined).toArray().map(n => n.toArray().map(r => r.get('value', 0)));
    return grid;
}

export function getSquare(grid, row, col) {
    const squareRow = Math.floor(row / 3);
    const squareCol = Math.floor(col / 3);
    return grid.slice(squareRow * 3, (squareRow + 1) * 3)
        .map(row => row.slice(squareCol * 3, (squareCol + 1) * 3));
}

export function isSquareContaining(grid, i, j, value) {
    const square = getSquare(grid, i * 3, j * 3);
    return square.find(row => row.find(v => v === value) !== undefined) !== undefined;
}