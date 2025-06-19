import {
  Board,
  BoardCell,
  Difficulty,
} from '../../../core/models/sudoku.types';

export type SudokuStatus =
  | 'idle'
  | 'solved'
  | 'autosolved'
  | 'unsolved'
  | 'unsolvable'
  | 'broken'
  | 'error';

export interface SudokuStateModel {
  original: Board | null;
  working: Board | null;
  loading: boolean;
  selectedCell: BoardCell | null;
  status: SudokuStatus;
  gameDifficulty: Difficulty;
}
