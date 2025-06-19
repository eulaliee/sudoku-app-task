import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  Board,
  BoardResponse,
  Difficulty,
  SolveResponse,
  SudokuRequest,
  ValidateResponse,
} from '../models/sudoku.types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SudokuApiService {
  private httpService = inject(HttpClient);
  private baseUrl = 'https://sugoku.onrender.com';

  private generateRequestBody(board: Board): string {
    return new HttpParams().set('board', JSON.stringify(board)).toString();
  }

  getBoard(difficulty: Difficulty = 'random'): Observable<BoardResponse> {
    return this.httpService.get<BoardResponse>(
      `${this.baseUrl}/board?difficulty=${difficulty}`
    );
  }

  validateBoard(request: SudokuRequest): Observable<ValidateResponse> {
    return this.httpService.post<ValidateResponse>(
      `${this.baseUrl}/validate`,
      this.generateRequestBody(request.board),
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      }
    );
  }

  solveBoard(req: SudokuRequest): Observable<SolveResponse> {
    return this.httpService.post<SolveResponse>(
      `${this.baseUrl}/solve`,
      this.generateRequestBody(req.board),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
  }
}
