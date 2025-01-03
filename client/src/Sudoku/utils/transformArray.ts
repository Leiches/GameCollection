export const transformArray = (originalArray: number[][]): number[][] => {
  const newArray = []
  for (let i = 0; i < originalArray.length; i += 3) {
    for (let j = 0; j < 3; j++) {
      const newRow = []
      for (let k = 0; k < 3; k++) {
        newRow.push(
          originalArray[i + k][j * 3],
          originalArray[i + k][j * 3 + 1],
          originalArray[i + k][j * 3 + 2],
        )
      }
      newArray.push(newRow)
    }
  }
  return newArray
}
