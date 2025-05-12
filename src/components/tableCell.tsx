import { useMatrixContext } from 'context/MatrixContext';
import { Cell } from 'types/types';
import { calculateHeatBg } from 'utils/calculateHeatBg';

type Props = {
  cell: Cell;
  sum: number;
  rowMax: number;
  showPercent: boolean;
};

export default function TableCell({ cell, sum, rowMax, showPercent }: Props) {
  const { setCells, nearestIds, setNearestIds, cells, settings } = useMatrixContext();

  const handleClick = () => {
    setCells(prev =>
      prev.map(c =>
        c.id === cell.id
          ? { ...c, amount: Math.min(c.amount + 1, 999) }
          : c
      )
    );
  };

  const handleMouseEnter = () => {
    const sorted = [...cells]
      .sort((a, b) =>
        Math.abs(a.amount - cell.amount) - Math.abs(b.amount - cell.amount)
      )
      .slice(0, settings.nearestCount)
      .map(c => c.id);

    setNearestIds(sorted);
  };

  const handleMouseLeave = () => {
    setNearestIds([]);
  };

  const percent = sum ? Math.round((cell.amount / sum) * 100) : 0;
  const isNearest = nearestIds.includes(cell.id);

  const background = showPercent
    ? calculateHeatBg(cell.amount, rowMax)
    : isNearest
    ? 'rgba(99, 102, 241, 0.5)'
    : undefined;

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative h-12 flex items-center justify-center text-white text-sm bg-gray-800 border-r border-b border-gray-700 cursor-pointer select-none"
    >
      {background && (
        <div
          className="absolute inset-0 rounded"
          style={{ background }}
        />
      )}
      <span className="relative z-10">
        {showPercent ? `${percent}%` : cell.amount}
      </span>
    </div>
  );
}
