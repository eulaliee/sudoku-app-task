import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuControls } from './sudoku-controls';

describe('SudokuControls', () => {
  let component: SudokuControls;
  let fixture: ComponentFixture<SudokuControls>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuControls]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuControls);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
