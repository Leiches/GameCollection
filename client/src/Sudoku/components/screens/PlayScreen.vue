<script setup lang="ts">
import GameBoard from '../GameBoard.vue'
import GameInfo from '../GameInfo.vue'
import UserInfo from '../UserInfo.vue'

const screenWidth: number = window.innerWidth;
const screenHeight: number = window.innerHeight;

</script>

<template>
  <div class="container">
    <header>
      <h1>Sudoku</h1>
      <UserInfo />
      <GameInfo />
    </header>
    <main>
      <Suspense>
        <GameBoard />
      </Suspense>
    </main>
  </div>
</template>

<style scoped>
main {
  margin-top: 16px;
}
@media (min-width: 1024px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }
}
</style>
