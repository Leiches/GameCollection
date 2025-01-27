<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { ref, onMounted } from 'vue';
const showGames = ref(false);
const userStore = useUserStore()

const text = ref('');
const messages = ref([]);



</script>

<template>

  <div v-if="!showGames">
    <div>
      <div>
        <label for="firstName">Name:</label>
        <input type="text" id="firstName" v-model="userStore.userName" @keyup.enter="showGames = true;"/>
      </div>
      <button :disabled="userStore.userName == ''" @click="showGames = true;" >Play Games</button>
    </div>
  </div>
  <div v-if="showGames">
    <header>
      <h1>Game LandingPage</h1>
    </header>
    <main>
      <router-link to="/Sudoku/play">Play Sudoku</router-link>
      <router-link to="/CrazyChicken">Play Crazy Chicken</router-link>
      <router-link to="/Crossword/play">Play Daily Crossword</router-link>
      <router-link to="/CineLine/splashscreen">Play CineLine</router-link>
    </main>
  </div>
</template>

<style scoped>
header {
  padding: 16px 0;
}
input,
select {
  width: 100%;
}

a, button {
  display: block;
  margin-top: 8px;
  text-align: center;
  width: 100%;
}
</style>
