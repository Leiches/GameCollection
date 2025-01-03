<script setup lang="ts">
import { useGameStore } from '@/Sudoku/store/game'
const gameStore = useGameStore()
const props = defineProps<{
  sudokuBlockNumber: number
  numberBlockNumber: number
}>()
const blockNumber = gameStore.board
  ? String(gameStore.board[props.sudokuBlockNumber - 1][props.numberBlockNumber - 1] || '')
  : ''
</script>

<template>
  <div class="number-block static-number">{{ blockNumber }}</div>
</template>

<style scoped>
.number-block {
  border: 1px solid #444;
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.static-number {
  font-size: 2rem;
}
</style>
