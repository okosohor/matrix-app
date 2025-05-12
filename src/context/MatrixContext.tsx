import { createContext, useContext, useState } from 'react';
import { Cell, MatrixContextType, Settings } from 'types/types';

const defaultSettings: Settings = {
  rows: 0,
  columns: 0,
  nearestCount: 0,
};

const MatrixContext = createContext<MatrixContextType>({} as MatrixContextType);

export function useMatrixContext(): MatrixContextType {
  return useContext(MatrixContext);
}

export function MatrixProvider({ children }: { children: React.ReactNode }) {
  const [cells, setCells] = useState<Cell[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const [id, setId] = useState(0);
  const [nearestIds, setNearestIds] = useState<number[]>([]);
  return (
    <MatrixContext.Provider
      value={{
        cells,
        setCells,
        settings,
        setSettings,
        id,
        setId,
        nearestIds,
        setNearestIds,
      }}
    >
      {children}
    </MatrixContext.Provider>
  );
}
