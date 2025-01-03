import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useGameStore = defineStore('game', () => {
  const board = ref<number[][] | null>(null)
  const difficultyLevel = ref(1)
  const difficultyLabel = computed(() => {
    switch (difficultyLevel.value) {
      case 1:
        return 'easy'
      case 2:
        return 'medium'
      case 3:
        return 'hard'
      default:
        return 'unknown'
    }
  })

  return {
    board,
    difficultyLevel,
    difficultyLabel,
  }
})
