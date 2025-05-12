import { createMatrix } from 'utils/createMatrix';
import Input from './input';
import { useState } from 'react';
import { useMatrixContext } from 'context/MatrixContext';
import { Settings } from 'types/types';

export function HeaderBlock() {
  const { settings, setSettings, setCells, cells, id, setId } = useMatrixContext();
  const [temporarySettings, setTemporarySettings] = useState<Settings>(settings);

  function handleCreateMatrix() {
    setSettings(temporarySettings);

    const matrix = createMatrix(temporarySettings.rows, temporarySettings.columns, id);

    setCells(matrix);
    setId(id + matrix.length);
  }

  function handleAddRow() {
    const { columns } = settings;
    if (columns === 0) return;

    let currentId = id;

    const newRow = Array.from({ length: columns }, () => ({
      id: currentId++,
      amount: Math.floor(Math.random() * 900 + 100),
    }));

    setCells(prev => [...prev, ...newRow]);
    setId(currentId);

    setSettings(prev => ({ ...prev, rows: prev.rows + 1 }));
    setTemporarySettings(prev => ({ ...prev, rows: prev.rows + 1 }));
  }

  function handleDeleteRow() {
    const { columns, rows } = settings;

    if (rows === 0 || columns === 0) return;

    const newCells = cells.slice(0, -columns);

    setCells(newCells);
    setSettings(prev => ({ ...prev, rows: prev.rows - 1 }));
  }

  function handleTemporaryValueChange(name: string, value: number) {
    setTemporarySettings(prev => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <div className="bg-gray-800 rounded-lg p-3 shadow-md flex flex-wrap items-center gap-2">
      <Input
        label="Rows"
        name="rows"
        value={temporarySettings.rows}
        onChange={handleTemporaryValueChange}
      />
      <Input
        label="Columns"
        name="columns"
        value={temporarySettings.columns}
        onChange={handleTemporaryValueChange}
      />
      <Input
        label="Nearest"
        name="nearestCount"
        value={temporarySettings.nearestCount}
        onChange={handleTemporaryValueChange}
      />

      <div className="flex gap-2 ml-auto">
        <button
          onClick={handleCreateMatrix}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded"
        >
          Calculate
        </button>
        <button
          onClick={handleAddRow}
          disabled={settings.columns === 0}
          className={`px-4 py-2 rounded text-white ${
            settings.columns === 0
              ? 'bg-gray-500 cursor-not-allowed'
              : 'bg-gray-700 hover:bg-gray-600'
          }`}
        >
          Add row
        </button>
        <button
          onClick={handleDeleteRow}
          disabled={settings.rows === 0}
          className={`px-4 py-2 rounded text-white ${
            settings.rows === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-400'
          }`}
        >
          Delete row
        </button>
      </div>
    </div>
  );
}
