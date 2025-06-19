import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SudokuStateModel } from './sudoku.models';
import { inject, Injectable } from '@angular/core';
import { SudokuApiService } from '../../../core/services/sudoku-api.service';
import { catchError, of, tap } from 'rxjs';
import * as SudokuActions from './sudoku.actions';

@State<SudokuStateModel>({
  name: 'sudoku',
  defaults: {
    original: null,
    working: null,
    loading: false,
    selectedCell: null,
    status: 'idle',
    gameDifficulty: 'random',
  },
})
@Injectable()
export class SudokuState {
  private apiService = inject(SudokuApiService);

  @Selector() static original(state: SudokuStateModel) {
    return state.original;
  }
  @Selector() static working(state: SudokuStateModel) {
    return state.working;
  }
  @Selector() static loading(state: SudokuStateModel) {
    return state.loading;
  }
  @Selector() static status(state: SudokuStateModel) {
    return state.status;
  }

  @Selector() static gameDifficulty(state: SudokuStateModel) {
    return state.gameDifficulty;
  }

  @Selector() static selectedCell(state: SudokuStateModel) {
    return state.selectedCell;
  }

  @Action(SudokuActions.NewGame)
  newGame(
    ctx: StateContext<SudokuStateModel>,
    { difficulty }: SudokuActions.NewGame,
  ) {
    ctx.patchState({ loading: true });
    return this.apiService.getBoard(difficulty).pipe(
      tap(({ board }) => {
        ctx.patchState({
          original: board.map((r) => [...r]),
          working: board.map((r) => [...r]),
          loading: false,
          status: 'idle',
          selectedCell: null,
          gameDifficulty: difficulty,
        });
      }),
      catchError((error) => {
        ctx.patchState({ loading: false, status: 'error' });
        return of(error);
      }),
    );
  }

  @Action(SudokuActions.SetCell)
  setCell(
    ctx: StateContext<SudokuStateModel>,
    { boardCellValue }: SudokuActions.SetCell,
  ) {
    const { row, col, value } = boardCellValue;
    const { original, working } = ctx.getState();
    if (!original || original[row][col] !== 0) {
      return;
    }
    const newWorking = working?.map((r) => [...r]) || [];
    newWorking[row][col] = value;
    ctx.patchState({ working: [...newWorking] });
  }

  @Action(SudokuActions.SetSelectedCell)
  setSelectedCell(
    ctx: StateContext<SudokuStateModel>,
    { boardCell }: SudokuActions.SetSelectedCell,
  ) {
    ctx.patchState({ selectedCell: boardCell });
  }

  @Action(SudokuActions.Validate)
  validate(ctx: StateContext<SudokuStateModel>) {
    ctx.patchState({ loading: true });
    return this.apiService
      .validateBoard({ board: ctx.getState().working! })
      .pipe(
        tap(({ status }) =>
          ctx.patchState({
            status,
            loading: false,
          }),
        ),
        catchError((error) => {
          ctx.patchState({
            status: 'error',
            loading: false,
          });
          return of(error);
        }),
      );
  }

  @Action(SudokuActions.Solve)
  solve(ctx: StateContext<SudokuStateModel>) {
    ctx.patchState({ loading: true });
    const boardCopy = ctx.getState().original!.map((r) => [...r]);
    return this.apiService.solveBoard({ board: boardCopy }).pipe(
      tap(({ status, solution }) => {
        const solvedBoard = solution.map((r) => [...r]);
        ctx.patchState({
          working: solvedBoard,
          status: status === 'solved' ? 'autosolved' : status,
          loading: false,
        });
      }),
      catchError((error) => {
        ctx.patchState({
          loading: false,
          status: 'error',
        });
        return of(error);
      }),
    );
  }

  @Action(SudokuActions.Reset)
  reset(ctx: StateContext<SudokuStateModel>) {
    ctx.patchState({
      working: ctx.getState().original?.map((r) => [...r]),
      status: 'idle',
      loading: false,
    });
  }
}
