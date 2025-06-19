import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-background',
  imports: [],
  templateUrl: './background.html',
  styleUrl: './background.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Background {}
