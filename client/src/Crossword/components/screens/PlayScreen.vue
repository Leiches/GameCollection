<script setup lang="ts">
import GameBoard from '../GameBoard.vue'
import UserInfo from '../UserInfo.vue'
</script>

<template>
  <div class="container">
    <header>
      <h1>Crossword Puzzle</h1>
      <UserInfo />
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
