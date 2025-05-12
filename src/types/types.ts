export type Cell = {
  id: number
  amount: number
}

export type Settings = {
  rows: number
  columns: number
  nearestCount: number
}

export type MatrixContextType = {
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>
  cells: Cell[];
  setCells: React.Dispatch<React.SetStateAction<Cell[]>>
  id: number
  setId: React.Dispatch<React.SetStateAction<number>> 
  nearestIds: number[]
  setNearestIds: React.Dispatch<React.SetStateAction<number[]>>
};