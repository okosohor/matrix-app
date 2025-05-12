import { Cell } from "types/types"

export const createMatrix = (rows: number, columns: number, id: number): Cell[] => {
  const cellCount = rows * columns
  return Array.from({ length: cellCount }, (_, i) => ({
    id: id + i,
    amount: Math.floor(Math.random() * 900 + 100),
  }))
}