import { BoardCell, BoardCellValue, Difficulty } from '../../../core/models/sudoku.types';

export class NewGame {
  static readonly type = '[Sudoku] New Game';
  constructor(public difficulty: Difficulty) {}
}

export class SetCell {
  static readonly type = '[Sudoku] Set Cell';
  constructor(public boardCellValue: BoardCellValue) {}
}

export class SetSelectedCell {
  static readonly type = '[Sudoku] Set Selected Cell';
  constructor(public boardCell: BoardCell) {}
}

export class Validate {
  static readonly type = '[Sudoku] Validate';
}

export class Solve {
  static readonly type = '[Sudoku] Solve';
}

export class Reset {
  static readonly type = '[Sudoku] Reset';
}
