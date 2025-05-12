import { useMatrixContext } from 'context/MatrixContext';
import { Cell } from 'types/types';
import Row from './row';
import PercentileRow from './percentileRow';
import { ZeroState } from './zeroState';

export default function Table() {
  const { cells, settings } = useMatrixContext();
  const { rows, columns } = settings;

  const isEmptyTable = rows === 0 || columns === 0 || cells.length === 0;

  function prepareRows() {
    const preparedRows: { rowIndex: number; cells: Cell[] }[] = [];
    for (let i = 0; i < rows; i++) {
      const start = i * columns;
      preparedRows.push({ rowIndex: i, cells: cells.slice(start, start + columns) });
    }
    return preparedRows;
  }

  const preparedRows = prepareRows();


  return isEmptyTable ? (
    <ZeroState />
  ) : (
    <div className="w-full overflow-x-auto">
      <div
        className="grid border-l border-t border-gray-700 min-w-full"
        style={{
          gridTemplateColumns: `minmax(50px, 1fr) repeat(${columns}, minmax(50px, 1fr)) minmax(50px, 1fr)`,
        }}
      >
        <div className="h-12 flex items-center justify-center text-white text-sm bg-gray-900 border-r border-b border-gray-700">
          #
        </div>
        {Array.from({ length: columns }, (_, colIdx) => (
          <div
            key={colIdx}
            className="h-12 flex items-center justify-center text-white text-sm bg-gray-900 border-r border-b border-gray-700"
          >
            {colIdx + 1}
          </div>
        ))}
        <div className="h-12 flex items-center justify-center text-white text-sm bg-gray-900 border-r border-b border-gray-700">
          *
        </div>
        {preparedRows.map(({ rowIndex, cells }) => (
          <Row key={rowIndex} rowIndex={rowIndex} cells={cells} />
        ))}
        <PercentileRow />
      </div>
    </div>
  );
}
