import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SudokuContainer } from './sudoku-container';

describe('SudokuContainer', () => {
  let component: SudokuContainer;
  let fixture: ComponentFixture<SudokuContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SudokuContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SudokuContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
