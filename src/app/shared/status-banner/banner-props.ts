import { SudokuStatus } from '../../features/sudoku/state/sudoku.models';
export const getBannerProps = (status: SudokuStatus) => {
  switch (status) {
    case 'solved':
      return {
        type: 'success',
        message: 'Congratulations! You solved the puzzle.',
      };
    case 'autosolved':
      return {
        type: 'info',
        message: 'The solution for this puzzle has been retrieved successfully',
      };
    case 'unsolved':
      return {
        type: 'info',
        message: `Great work so far, but the puzzle isn't solved yet. Keep going!`,
      };
    case 'unsolvable':
      return {
        type: 'info',
        message: `Oh no! It looks like this puzzle is unsolvable.`,
      };
    case 'broken':
      return {
        type: 'warning',
        message: `Oh no! There are some mistakes in the puzzle. Double check and try again!`,
      };
    case 'error':
      return {
        type: 'warning',
        message: `Something went wrong.`,
      };
    case 'idle':
      return { message: '', type: 'none' };
    default:
      return { message: '', type: 'none' };
  }
};
