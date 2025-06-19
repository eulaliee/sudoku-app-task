import { Component, output } from '@angular/core';
import { BOARD_SIZE } from '../../../../core/constants/board-size';

@Component({
  selector: 'app-sudoku-number-pad',
  imports: [],
  templateUrl: './sudoku-number-pad.html',
  styleUrl: './sudoku-number-pad.scss',
})
export class SudokuNumberPad {
  numberClicked = output<number>();
  numbers = Array.from({ length: BOARD_SIZE }, (_, i) => i + 1);
}
