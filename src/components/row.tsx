import { useState } from 'react';
import { Cell } from 'types/types';
import TableCell from './tableCell';

type Props = {
  rowIndex: number;
  cells: Cell[];
};

export default function Row({ rowIndex, cells }: Props) {
  const [isCellHovered, setIsCellHovered] = useState(false);

  const sum = cells.reduce((acc, cell) => acc + cell.amount, 0);
  const rowMax = Math.max(...cells.map(cell => cell.amount));

  return (
    <>
      <div className="h-12 flex items-center justify-center text-white text-sm bg-gray-900 border-r border-b border-gray-700">
        {rowIndex + 1}
      </div>

      {/* Matrix cells */}
      {cells.map(cell => (
        <TableCell
          key={cell.id}
          cell={cell}
          sum={sum}
          rowMax={rowMax}
          showPercent={isCellHovered}
        />
      ))}
      <div
        onMouseEnter={() => setIsCellHovered(true)}
        onMouseLeave={() => setIsCellHovered(false)}
        className="h-12 flex items-center justify-center text-white text-sm bg-gray-900 border-r border-b border-gray-700 cursor-pointer select-none hover:bg-gray-700 transition"
      >
        {sum}
      </div>
    </>
  );
}
