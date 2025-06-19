import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { Spinner } from '../../../../shared/spinner/spinner';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CellBorderDirective } from '../../../../core/directives/cell-border.directive';
import { pairwise, startWith } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  BoardCellValue,
  BoardCell,
} from '../../../../core/models/sudoku.types';
import { BOARD_SIZE, ONE_TO_N } from '../../../../core/constants/board-size';

@Component({
  selector: 'app-sudoku-board',
  imports: [Spinner, ReactiveFormsModule, CellBorderDirective],
  templateUrl: './sudoku-board.html',
  styleUrl: './sudoku-board.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SudokuBoard {
  board = input.required<number[][]>();
  original = input<number[][] | null>();
  loading = input.required<boolean>();
  cellValue = output<BoardCellValue>();
  form = signal(new FormGroup({}));
  selectCell = output<BoardCell>();
  selectedCell = input<BoardCell | null>();
  cd = inject(ChangeDetectorRef);

  private readonly destroyRef = inject(DestroyRef);

  public locked = computed<boolean[][]>(() => {
    const orig = this.original();
    if (!orig) {
      return Array.from({ length: BOARD_SIZE }, () =>
        Array(BOARD_SIZE).fill(false),
      );
    }
    return orig.map((row: number[]) => row.map((cell: number) => cell !== 0));
  });

  constructor() {
    effect(() => this.buildForm());
    effect(() => this.subscribeToForm());
  }

  public ctrlKey(row: number, cell: number) {
    return `${row}:${cell}`;
  }

  public onFocusCell(event: FocusEvent, row: number, col: number) {
    if (event.relatedTarget) {
      this.selectCell.emit({ row, col });
      this.cd.markForCheck();
    }
  }

  public onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Backspace' && this.selectedCell()) {
      const { row, col } = this.selectedCell()!;
      this.cellValue.emit({ row, col, value: 0 } as BoardCellValue);
    }
  }

  private buildForm(): void {
    const grid = this.board();
    const locked = this.locked();
    const ctrls: Record<string, FormControl<string>> = {};

    grid.forEach((row, rowIndex) =>
      row.forEach((_, cellIndex) => {
        const isLocked = locked[rowIndex][cellIndex];
        const startValue =
          !isLocked && grid[rowIndex][cellIndex] !== 0
            ? grid[rowIndex][cellIndex].toString()
            : '';

        const control = new FormControl<string>(startValue, {
          nonNullable: true,
          validators: [Validators.pattern(ONE_TO_N)],
          updateOn: 'change',
        });

        if (isLocked) control.disable({ emitEvent: false });

        ctrls[this.ctrlKey(rowIndex, cellIndex)] = control;
      }),
    );

    this.form.set(new FormGroup(ctrls));
  }

  private subscribeToForm(): void {
    const form = this.form();

    form.valueChanges
      .pipe(
        startWith(form.value),
        pairwise(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(
        ([prev, curr]: [Record<string, string>, Record<string, string>]) => {
          const changedKey = Object.keys(curr).find((k) => prev[k] !== curr[k]);
          if (!changedKey) return;

          const [row, col] = changedKey.split(':').map(Number);
          const raw = curr[changedKey] ?? '';
          const lastChar = raw.at(-1) ?? '';
          const digit = ONE_TO_N.test(lastChar) ? +lastChar : 0;
          if (raw !== lastChar) {
            form.get(changedKey)!.setValue(lastChar, { emitEvent: false });
          }
          this.cellValue.emit({ row, col, value: digit } as BoardCellValue);
        },
      );
  }
}
