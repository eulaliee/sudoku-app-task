import { Component, computed, input } from '@angular/core';
import { SudokuStatus } from '../../features/sudoku/state/sudoku.models';
import { getBannerProps } from './banner-props';

@Component({
  selector: 'app-status-banner',
  imports: [],
  templateUrl: './status-banner.html',
  styleUrl: './status-banner.scss',
})
export class StatusBanner {
  loading = input.required<boolean>();
  status = input.required<SudokuStatus>();

  readonly bannerProps = computed(() => {
    const status = this.status();
    return getBannerProps(status);
  });

  private readonly statusClasses: Record<
    'success' | 'info' | 'warning',
    string
  > = {
    success: 'text-emerald-800 bg-emerald-300',
    info: 'text-violet-800 bg-violet-300',
    warning: 'text-pink-800 bg-pink-300',
  };

  readonly badgeClass = computed(() => {
    const props = this.bannerProps();
    return props &&
      (props.type === 'success' ||
        props.type === 'info' ||
        props.type === 'warning')
      ? `inline-block px-2 py-2 rounded font-semibold ${this.statusClasses[props.type]}`
      : '';
  });
}
