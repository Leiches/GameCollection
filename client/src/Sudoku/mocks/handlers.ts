import { http, HttpHandler, HttpResponse } from 'msw'

const getSudokuBoardHandler: HttpHandler = http.get('https://sugoku.onrender.com/board', () => {
  return HttpResponse.json({
    board: [
      [0, 0, 0, 1, 0, 0, 0, 0, 8],
      [0, 0, 0, 0, 0, 0, 1, 2, 0],
      [0, 0, 1, 0, 0, 0, 3, 4, 6],
      [2, 0, 4, 0, 5, 0, 8, 9, 7],
      [0, 6, 5, 8, 9, 0, 2, 0, 4],
      [0, 9, 7, 1, 0, 0, 5, 0, 3],
      [6, 0, 1, 0, 4, 2, 9, 8, 0],
      [0, 0, 0, 0, 8, 0, 0, 0, 3],
      [0, 0, 8, 0, 3, 0, 0, 0, 0],
    ],
  })
})

export const handlers = [getSudokuBoardHandler]
