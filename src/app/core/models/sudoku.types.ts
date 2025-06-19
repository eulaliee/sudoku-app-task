export type Difficulty = 'easy' | 'medium' | 'hard' | 'random';
export type SolveStatus = 'solved' | 'broken' | 'unsolvable';
export type ValidateStatus = 'solved' | 'broken' | 'unsolved';

export type Board = number[][];
export interface BoardResponse {
  board: Board;
}
export interface SolveResponse {
  difficulty: Difficulty;
  solution: Board;
  status: SolveStatus;
}
export interface ValidateResponse {
  status: ValidateStatus;
}
export interface SudokuRequest {
  board: Board;
}


export interface BoardCell {
    row: number;
    col: number;
}

export interface BoardCellValue extends BoardCell {
    value: number;
}