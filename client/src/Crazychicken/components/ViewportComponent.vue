<script setup lang="ts">
import {onMounted, ref} from "vue"
import GameWindow from "@/CrazyChicken/components/GameWindowComponent.vue";
import GameoverScreenComponent from "@/CrazyChicken/components/GameoverScreenComponent.vue";
import { useRouter } from "vue-router";

const isPlaying = ref(true);
const score = ref(0);
const router = useRouter();

const viewportWidth = ref(0);
const viewportHeight = ref(0);

onMounted(() => {
  const gameWindow = document.getElementById('viewport');
  if (gameWindow) {
    const rect = gameWindow.getBoundingClientRect();
    viewportWidth.value = rect.width;
    viewportHeight.value = rect.height;
  }

})

function setGameOver(newScore: number): void {
  isPlaying.value = !isPlaying.value
  score.value = newScore;
}

function restartGame(): void {
  isPlaying.value = !isPlaying.value;
}

function goBackToMenu(): void {
  router.push('/');
}
</script>

<template>
  <div id="viewport">
    <GameWindow
      v-if="isPlaying"
      @gameover="setGameOver"
      :game-window-width="viewportWidth"
      :game-window-height="viewportHeight"
    >
    </GameWindow>
    <GameoverScreenComponent
      v-if="!isPlaying"
      :score="score"
      :game-window-width="viewportWidth"
      :game-window-height="viewportHeight"
      @restartGame="restartGame"
      @back="goBackToMenu"
    >
    </GameoverScreenComponent>
  </div>
</template>

<style scoped>
#viewport {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
