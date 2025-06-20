import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  bp = inject(BreakpointObserver);
  isMobile = toSignal(
    this.bp
      .observe([Breakpoints.Handset, Breakpoints.Tablet])
      .pipe(map((result) => result.matches)),
    { initialValue: window.innerWidth < 768 },
  );
}
