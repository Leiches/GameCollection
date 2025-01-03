<script setup lang="ts">
import { useGameStore } from '@/Sudoku/store/game'
import { useUserStore } from '@/Sudoku/store/user'

const userStore = useUserStore()
const gameStore = useGameStore()
</script>

<template>
  <form>
    <div>
      <label for="firstName">First Name:</label>
      <input type="text" id="firstName" v-model="userStore.firstName" />
    </div>
    <div>
      <label for="lastName">Last Name:</label>
      <input type="text" id="lastName" v-model="userStore.lastName" />
    </div>
    <div>
      <label for="difficulty">Difficulty:</label>
      <select
        id="difficulty"
        :value="gameStore.difficultyLevel"
        @change="gameStore.difficultyLevel = Number(($event.target as HTMLSelectElement).value)"
      >
        <option v-for="n of 3" :key="n">{{ n }}</option>
      </select>
    </div>
  </form>
</template>

<style scoped>
input,
select {
  width: 100%;
}

a {
  display: block;
  margin-top: 8px;
  text-align: center;
  width: 100%;
}
</style>
