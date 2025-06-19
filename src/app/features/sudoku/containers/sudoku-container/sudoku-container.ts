import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import * as SudokuActions from '../../state/sudoku.actions';
import {
  BoardCell,
  BoardCellValue,
  Difficulty,
} from '../../../../core/models/sudoku.types';
import { toSignal } from '@angular/core/rxjs-interop';
import { SudokuState } from '../../state/sudoku.state';
import { SudokuControls } from '../../components/sudoku-controls/sudoku-controls';
import { SudokuBoard } from '../../components/sudoku-board/sudoku-board';
import { SudokuNumberPad } from '../../components/sudoku-number-pad/sudoku-number-pad';
import { StatusBanner } from '../../../../shared/status-banner/status-banner';

@Component({
  selector: 'app-sudoku-container',
  imports: [SudokuControls, SudokuBoard, StatusBanner, SudokuNumberPad],
  templateUrl: './sudoku-container.html',
  styleUrl: './sudoku-container.scss',
})
export class SudokuContainer implements OnInit {
  private store = inject(Store);
  original = toSignal(this.store.select(SudokuState.original));
  working = toSignal(this.store.select(SudokuState.working));
  loading = toSignal(this.store.select(SudokuState.loading));
  status = toSignal(this.store.select(SudokuState.status));
  gameDifficulty = toSignal(this.store.select(SudokuState.gameDifficulty));
  selectedCell = toSignal(this.store.select(SudokuState.selectedCell));

  public ngOnInit() {
    if (!this.original()?.length) {
      this.store.dispatch(new SudokuActions.NewGame('random'));
    }
  }

  public onCellValueChange(boardCellValue: BoardCellValue) {
    this.store.dispatch(new SudokuActions.SetCell(boardCellValue));
  }

  public onSelectedCellChange(boardCell: BoardCell) {
    this.store.dispatch(new SudokuActions.SetSelectedCell(boardCell));
  }

  public onNumberClicked(value: number) {
    const sel = this.selectedCell();
    if (!sel) {
      return;
    }
    this.store.dispatch(
      new SudokuActions.SetCell({
        ...sel,
        value,
      } as BoardCellValue),
    );
  }

  public onNewGame(difficulty: Difficulty) {
    this.store.dispatch(new SudokuActions.NewGame(difficulty));
  }

  public onValidate() {
    this.store.dispatch(new SudokuActions.Validate());
  }

  public onSolve() {
    this.store.dispatch(new SudokuActions.Solve());
  }

  public onResetBoard() {
    this.store.dispatch(new SudokuActions.Reset());
  }
}
