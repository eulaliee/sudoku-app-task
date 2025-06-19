import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SudokuContainer } from './features/sudoku/containers/sudoku-container/sudoku-container';
import { Toolbar } from "./shared/toolbar/toolbar";
import { Background } from "./shared/background/background";
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [SudokuContainer, Toolbar, Background],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  protected title = 'sudoku-app-task';
}
