<script setup lang="ts">
import StartForm from '../StartForm.vue'
</script>

<template>
  <header>
    <h1>Welcome to Sudoku+</h1>
  </header>
  <main>
    <StartForm />
    <router-link to="/Sudoku/play">Play Game</router-link>
  </main>
</template>

<style scoped>
header {
  padding: 16px 0;
}
</style>
