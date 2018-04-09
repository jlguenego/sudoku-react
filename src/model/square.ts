import { Record, List } from 'immutable';

interface SquareProps {
    value: number;
    isOriginal: boolean;
    possibleValues: List<number>;
}

export type ImmutableSquare = Record<SquareProps>;
export type ImmutableSquareFactory = Record.Factory<SquareProps>;

export const Square: ImmutableSquareFactory = Record({ value: 0, isOriginal: false, possibleValues: List<number>() });
