import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { StorageOption, withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { provideStore } from '@ngxs/store';
import { SudokuState } from './features/sudoku/state/sudoku.state';
import { provideHttpClient } from '@angular/common/http';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(
      [SudokuState],
      withNgxsLoggerPlugin({
        disabled: false,
      }),
      withNgxsReduxDevtoolsPlugin({
        disabled: false, // Set to true to disable Redux DevTools in production
      }),
      withNgxsStoragePlugin({
        keys: ['sudoku'],
        storage: StorageOption.LocalStorage,
      }),
    ),
  ],
};
