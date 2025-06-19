import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, input, output } from '@angular/core';
import { Difficulty } from '../../../../core/models/sudoku.types';

@Component({
  selector: 'app-sudoku-controls',
  imports: [],
  templateUrl: './sudoku-controls.html',
  styleUrl: './sudoku-controls.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SudokuControls {
  loading = input.required<boolean>();
  status = input<string>();
  newGame = output<Difficulty>();
  validate = output<void>();
  solve = output<void>();
  resetBoard = output<void>();
  selecteDifficulty = input<Difficulty>();

  cd = inject(ChangeDetectorRef);

  difficulties: { label: string; value: Difficulty }[] = [
    { label: 'Easy', value: 'easy' },
    { label: 'Medium', value: 'medium' },
    { label: 'Hard', value: 'hard' },
    { label: 'Random', value: 'random' },
  ];

  selectDifficulty(difficulty: Difficulty) {
    if (this.loading()) return;
    this.newGame.emit(difficulty);
    this.cd.markForCheck();
  }
}
