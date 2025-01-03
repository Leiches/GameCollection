export const isValidSudokuNumber = (value: number): boolean => {
  if (!Number.isInteger(value)) return false
  return value >= 1 && value <= 9
}
