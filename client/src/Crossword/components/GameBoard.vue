<template>
  <div class="board">
    <div class="grid">
      <div v-for="(row, rowIndex) in playGrid" :key="rowIndex" class="row">
        <div
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          class="cell"
          :class="{
            'black-cell': cell === 'black',
            'clue-cell': cell !== 'black' && cell.length > 1,
            'won-cell': isPuzzleWon && cell !== 'black' && cell.length <= 1
          }"
          @click="selectCell(rowIndex, colIndex)"
        >
          <template v-if="selectedCell && selectedCell.row === rowIndex && selectedCell.col === colIndex">
            <input
              type="text"
              class="cell-input"
              :value="cell === 'black' ? '' : cell"
              :ref="(el) => setCellRef(el, rowIndex, colIndex)"
              @input="handleInput($event, rowIndex, colIndex)"
              @blur="deselectCell"
              @keyup.enter="deselectCell"
            />
          </template>
          <template v-else>
            <span>{{ cell === 'black' ? '' : cell }}</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'


import { data as crosswordData } from '../data/data.js'


function fetchAndProcessCrosswordData() {
  try {
    if (!Array.isArray(crosswordData) || !crosswordData.length) {
      throw new Error('Data array is empty or not properly formatted');
    }
    console.log(`Total entries: ${crosswordData.length}`);


    const shuffledData = crosswordData.sort(() => Math.random() - 0.5).slice(0, 500);

    console.log(shuffledData);
    return shuffledData;
  } catch (error) {
    console.error('Error processing data:', error);
    return [];
  }
}

let puzzleData = fetchAndProcessCrosswordData();

if (puzzleData.length) {
  console.log('Processed crossword data:', puzzleData);
} else {
  console.warn('No crossword data processed.');
}


const isPuzzleWon = ref(false)

function insert(grid, clue, cluePos, word, x, y) {
  let start = 0;
  let direction = "";
  if (cluePos == "ld"){
    grid[x-1][y] = clue;
    start = 0;
    direction = "down";
  }
  if (cluePos == "rd"){
    grid[x+1][y] = clue;
    start = 0;
    direction = "down";
  }
  if (cluePos == "ur"){
    grid[x][y+1] = clue;
    start = 0;
    direction = "right";
  }
  if (cluePos == "ad"){
    grid[x][y] = clue;
    start = 1;
    direction = "down";
  }
  if (cluePos == "ar"){
    grid[x][y] = clue;
    start = 1;
    direction = "right";
  }
  if (cluePos == "lr"){
    grid[x][y] = clue;
    start = 1;
    direction = "right";
  }

  if (direction === 'right') {
    for (let i = start; i <= word.length; i++) {
      grid[x + i][y] = word[i-start];
    }
  } else if (direction === 'down') {
    for (let i = start; i <= word.length; i++) {
      grid[x][y + i] = word[i-start];
    }
  } else {
    throw new Error('Invalid direction. Use "down" or "right".');
  }
  return grid;
}

function canPlace(grid, clue, cluePos, word, x, y) {
  let direction = "";
  let start = 0;

  if (cluePos == "ld" || cluePos == "rd") {
    start = 0;
    direction = "down";
  } else if (cluePos == "ur" || cluePos == "ar" || cluePos == "lr") {
    start = 1;
    direction = "right";
  } else if (cluePos == "ad") {
    start = 1;
    direction = "down";
  } else {
    return false;
  }

  if (direction === 'right') {
    if (x + word.length + 1 > grid.length) return false;
    for (let i = start; i <= word.length; i++) {
      let currentCell = grid[x + i][y];
      if (currentCell !== "" && currentCell !== word[i - start]) {
        return false;
      }
      if (currentCell === "") {
        if (y > 0 && grid[x + i][y - 1] !== "") return false;
        if (y < grid[0].length - 1 && grid[x + i][y + 1] !== "") return false;
      }
    }
    if (grid[x + word.length + start][y] !== "") return false;
  } else if (direction === 'down') {
    if (y + word.length + 1 > grid[0].length) return false;
    for (let i = start; i <= word.length; i++) {
      let currentCell = grid[x][y + i];
      if (currentCell !== "" && currentCell !== word[i - start]) {
        return false;
      }
      if (currentCell === "") {
        if (x > 0 && grid[x-1][y + i] !== "") return false;
        if (x < grid.length - 1 && grid[x+1][y + i] !== "") return false;
      }
    }
    if (grid[x][y + word.length + start] !== "") return false;
  } else {
    return false;
  }
  return true;
}

let crosswordGrid = Array(15).fill(null).map(() => Array(15).fill(""));

let inserted = [];


crosswordGrid = insert(crosswordGrid, puzzleData[0].question, "ad", puzzleData[0].answer, 1, 0);
inserted.push({
  ...puzzleData[0],
  dir: "ad",
  x: 1,
  y: 0
});
puzzleData = puzzleData.filter(item => item.question !== puzzleData[0].question);

let tries = 0;

while (true) {
  for (let i = 1; i < inserted[0].answer.length; i++){
    let filteredData = puzzleData.filter(item => item.answer.startsWith(inserted[0].answer[i]));

    if (inserted[0].dir == "ad"){
      for (let k = 0; k < filteredData.length; k++){
        if (canPlace(crosswordGrid, filteredData[k].question, "lr", filteredData[k].answer, inserted[0].x -1, i +1)) {
          crosswordGrid = insert(crosswordGrid, filteredData[k].question, "lr", filteredData[k].answer, inserted[0].x -1, i+1);
          let item = puzzleData.find(item => item.question === filteredData[k].question);
          item.dir = "lr";
          item.x = inserted[0].x - 1;
          item.y = i + 1;
          inserted.push(item);
          puzzleData = puzzleData.filter(p => p.question !== filteredData[k].question);
          break;
        }
      }
    }
    if (inserted[0].dir == "lr"){
      for (let k = 0; k < filteredData.length; k++){
        if (canPlace(crosswordGrid, filteredData[k].question, "ad", filteredData[k].answer, i + 1, inserted[0].y-1)) {
          crosswordGrid = insert(crosswordGrid, filteredData[k].question, "ad", filteredData[k].answer, i + 1, inserted[0].y-1);
          let item = puzzleData.find(item => item.question === filteredData[k].question);
          item.dir = "ad";
          item.x = i + 1;
          item.y = inserted[0].y - 1;
          inserted.push(item);
          puzzleData = puzzleData.filter(p => p.question !== filteredData[k].question);
          break;
        }
      }
    }
  }
  inserted = inserted.filter(item => item.question !== inserted[0].question);
  if (inserted.length == 0){
    break;
  }
}

let playGrid = Array(15).fill(null).map(() => Array(15).fill(""));

function fillEmptyCells(grid) {
  for (let row = 0; row < crosswordGrid.length; row++) {
    for (let col = 0; col < crosswordGrid[row].length; col++) {
      if (crosswordGrid[row][col].length > 1) {
        grid[row][col] = crosswordGrid[row][col];
      }
      if (crosswordGrid[row][col] === "") {
        grid[row][col] = "black";
      }
    }
  }
  return grid;
}

fillEmptyCells(playGrid);
console.log(crosswordGrid);



const selectedCell = ref<{ row: number; col: number } | null>(null)
const cellRefs = ref<Record<string, HTMLInputElement | null>>({})

function setCellRef(el: HTMLInputElement | null, row: number, col: number) {
  const key = `${row}-${col}`
  if (el) {
    cellRefs.value[key] = el

    if (selectedCell.value?.row === row && selectedCell.value?.col === col) {
      el.focus()
    }
  } else {
    delete cellRefs.value[key]
  }
}

function selectCell(row: number, col: number) {
  if (playGrid[row][col] === 'black') return
  selectedCell.value = { row, col }

  nextTick(() => {
    const key = `${row}-${col}`
    if (cellRefs.value[key]) {
      cellRefs.value[key]!.focus()
    }
  })
}

function isWon() {
  for (let row = 0; row < crosswordGrid.length; row++) {
    for (let col = 0; col < crosswordGrid[row].length; col++) {
      const solutionCell = crosswordGrid[row][col]
      const playerCell = playGrid[row][col]

      if (solutionCell === "") {
        if (playerCell !== "black") {
          return false
        }
      } else {
        if (playerCell !== solutionCell) {
          return false
        }
      }
    }
  }
  return true
}

function deselectCell() {
  selectedCell.value = null
  if (isWon()) {
    console.log("You Won!");
    isPuzzleWon.value = true;
  }
}

function handleInput(event: Event, row: number, col: number) {
  const input = event.target as HTMLInputElement
  let val = input.value.toUpperCase()

  if (val.length > 1) {
    val = val.slice(-1)
  }
  playGrid[row][col] = val
  input.value = val
}
</script>

<style scoped>
.board {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(15, 60px);
  grid-template-rows: repeat(15, 60px);
}

.cell {
  width: 60px;
  height: 60px;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: bold;
  background-color: #f0f0f0;
  cursor: pointer;
  text-transform: uppercase;
}

.black-cell {
  background-color: black;
  color: black;
  user-select: none;
  pointer-events: none;
}

.cell:hover {
  background-color: #ddd;
}

.cell span {
  font-size: min(1em, 4vw);
  width: fit-content;
  max-width: 100%;
  height: fit-content;
  text-align: center;
  pointer-events: none;
}

.cell span:empty::before {
  content: "\00a0";
}

.clue-cell {
  background-color: #afa7a7;
  user-select: none;
  pointer-events: none;
  font-size: 6px;
  color: black;
}

.won-cell {
  background-color: #d4f3d4 !important;
}

.cell-input {
  width: 100%;
  height: 100%;
  border: none;
  background: transparent;
  text-align: center;
  font-size: inherit;
  text-transform: uppercase;
  outline: none;
}
</style>
