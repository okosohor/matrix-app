import { useMatrixContext } from "context/MatrixContext";
import { calculatePercentile } from "utils/calculatePercentile";

export default function PercentileRow() {
  const { cells, settings } = useMatrixContext();
  const { rows, columns } = settings;

  if (rows === 0 || columns === 0 || cells.length === 0) return null;

  const columnsData: number[][] = Array.from({ length: columns }, () => []);

  cells.forEach((cell, index) => {
    const columnIndex = index % columns;
    columnsData[columnIndex].push(cell.amount);
  });

  const percentileValues = columnsData.map(columnValues =>
    calculatePercentile(columnValues, 60)
  );

  return (
    <>
      <div className="h-12 flex items-center justify-center text-white text-sm bg-gray-900 border-r border-b border-gray-700">
        %
      </div>
      {percentileValues.map((value, index) => (
        <div
          key={index}
          className="h-12 flex items-center justify-center text-white text-sm bg-gray-900 border-r border-b border-gray-700"
        >
          {value}
        </div>
      ))}
      <div className="h-12 flex items-center justify-center text-white text-sm bg-gray-900 border-r border-b border-gray-700">
        *
      </div>
    </>
  );
}
