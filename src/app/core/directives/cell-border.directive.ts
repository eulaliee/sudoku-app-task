// cell-border.directive.ts
import {
  Directive,
  OnChanges,
  ElementRef,
  Renderer2,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appCellBorder]',
  standalone: true,
})
export class CellBorderDirective implements OnChanges {
  rowIdx = input.required<number>();
  colIdx = input.required<number>();

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);

  ngOnChanges() {
    const map: [boolean, string][] = [
      [this.rowIdx() % 3 === 0, 'border-t-3'],
      [this.rowIdx() % 3 === 2, 'border-b-3'],
      [this.colIdx() % 3 === 0, 'border-l-3'],
      [this.colIdx() % 3 === 2, 'border-r-3'],
    ];

    for (const [cond, cls] of map) {
      if (cond) {
        this.renderer.addClass(this.el.nativeElement, cls);
      } else {
        this.renderer.removeClass(this.el.nativeElement, cls);
      }
    }
  }
}
