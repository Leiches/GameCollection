<script setup lang="ts">
import { transformArray } from '@/Sudoku/utils/transformArray'
import SudokuBlock from './SudokuBlock.vue'
import { useGameStore } from '@/Sudoku/store/game'
import axios from 'axios';

const gameStore = useGameStore()

await axios.get('http://localhost:8080/SudokuBoard')
  .then((data) => {
    console.log("data:");
    console.log(data);
    gameStore.board = transformArray(data.data.board)
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });


</script>

<template>
  <div class="board">
    <SudokuBlock v-for="n in 9" :key="n" :block-number="n" />
  </div>
</template>

<style scoped>
.board {
  display: grid;
  width: calc(100vmin - 4rem);
  height: calc(100vmin - 4rem);
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
}
</style>
