import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuNumberPad } from './sudoku-number-pad';

describe('SudokuNumberPad', () => {
  let component: SudokuNumberPad;
  let fixture: ComponentFixture<SudokuNumberPad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuNumberPad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuNumberPad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
