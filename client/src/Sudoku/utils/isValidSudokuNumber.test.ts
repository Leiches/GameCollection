import { isValidSudokuNumber } from './isValidSudokuNumber'

describe('isValidSudokuNumber utility method', () => {
  test('should validate number in middle of valid range', () => {
    const isValid = isValidSudokuNumber(5)
    expect(isValid).toBe(true)
  })

  test('should validate minimum valid value', () => {
    const isValid = isValidSudokuNumber(1)
    expect(isValid).toBe(true)
  })

  test('should validate maximum valid value', () => {
    const isValid = isValidSudokuNumber(9)
    expect(isValid).toBe(true)
  })

  test('should validate number higher than range', () => {
    const isValid = isValidSudokuNumber(10)
    expect(isValid).toBe(false)
  })

  test('should validate zero', () => {
    const isValid = isValidSudokuNumber(0)
    expect(isValid).toBe(false)
  })

  test('should evaluate false if number is not an integer', () => {
    const isValid = isValidSudokuNumber(1.5)
    expect(isValid).toBe(false)
  })
})
