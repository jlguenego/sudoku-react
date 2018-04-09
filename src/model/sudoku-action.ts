import { Action } from "@ngrx/store";
import { DifficultyEnum } from "./difficulty.enum";

export class SudokuAction implements Action {
    type: string;
    data?: SudokuActionData;
}

export interface SudokuActionData {
    value?: number;
    row?: number;
    col?: number;
    difficulty?: DifficultyEnum;
}