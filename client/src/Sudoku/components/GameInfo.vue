<script setup lang="ts">
import { useGameStore } from '@/Sudoku/store/game'

const gameStore = useGameStore()
</script>

<template>
  <p>Difficulty: {{ gameStore.difficultyLabel }}</p>
</template>

<style scoped></style>
