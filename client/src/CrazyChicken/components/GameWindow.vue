<script setup lang="ts">
import {ref, onMounted} from "vue";

const gameWindowWidth = ref(0);
const gameWindowHeight = ref(0);

const cooldown = ref(0);

// Start the game loop
onMounted(() => {
  const gameWindow = document.getElementById("game-window");
  if (gameWindow) {
    const rect = gameWindow.getBoundingClientRect();
    gameWindowWidth.value = rect.width;
    gameWindowHeight.value = rect.height;
  }

  const gameLoop = setInterval(() => {
    // Spawn zombies if the count is below the limit

    if (cooldown.value > 0)
    {
      cooldown.value -= 100;
    }


  // Add any additional game logic here (e.g., collision detection, scoring)
  }, 100);
});
</script>

<template>
  <div id="game-window">

  </div>
</template>


<style scoped>
div {
  background-color: lightgray;
  width: 900px;
  height: 675px;
  margin: 0;
  padding: 0;
  display: flex;
  overflow: hidden;
}
</style>
