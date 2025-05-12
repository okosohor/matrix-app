import { Cell } from 'types/types';

export const findNearest = (cells: Cell[], amount: number, count: number): number[] => {
  return [...cells]
    .sort((a, b) => Math.abs(a.amount - amount) - Math.abs(b.amount - amount))
    .slice(0, count)
    .map(cell => cell.id);
};
