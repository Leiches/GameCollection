<script setup lang="ts">
import { useUserStore } from '@/store/user'
import { ref, onMounted } from 'vue';
import { io } from 'socket.io-client';
let showGames = false
const userStore = useUserStore()

const text = ref('');
const messages = ref([]);
let socket;

const clickHandler = () => {
  if (socket) {
    socket.emit('message', `${userStore.userName}: ${text.value}`);
    text.value = '';
  }
};

const connectToChat = () => {
  socket = io('http://localhost:9992');
  socket.on('message', (data) => {
    messages.value.push(data);
  });
  socket.emit('message', `${userStore.userName} Joined!`);
};

</script>

<template>

  <div v-if="!showGames">
    <form>
      <div>
        <label for="firstName">Name:</label>
        <input type="text" id="firstName" v-model="userStore.userName" />
      </div>
      <button :disabled="userStore.userName == ''" @click="showGames = true; connectToChat();">Play Games</button>
    </form>
  </div>
  <div v-if="showGames">
    <header>
      <h1>Game LandingPage</h1>
    </header>
    <main>
      <router-link to="/Sudoku/play">Play Sudoku</router-link>
      <router-link to="/Sudoku/play">Play Game 2</router-link>
      <router-link to="/Sudoku/play">Play Game 3</router-link>
    </main>
    <div>
      <p><input v-model="text"><button @click="clickHandler">Send</button></p>
      <p v-if="messages.length == 0">No messages yet.</p>
      <ul v-else>
        <li v-for="msg in messages">{{ msg }}</li>
      </ul>
    </div>
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
