Overall viewport for all that is displayed in crazy chicken
<script setup lang="ts">
import {onMounted, ref} from "vue"
import GameWindow from "@/Crazychicken/components/GameWindowComponent.vue";
import GameoverScreenComponent from "@/Crazychicken/components/GameoverScreenComponent.vue";
import { useRouter } from "vue-router";

const isPlaying = ref(true);
const score = ref(0);
const router = useRouter();

const viewportWidth = ref(0);
const viewportHeight = ref(0);

const isVertical = ref(false);

// Set viewport width and value based on client rect
onMounted(() => {
  const gameWindow = document.getElementById('viewport');
  if (gameWindow) {
    const rect = gameWindow.getBoundingClientRect();
    viewportWidth.value = rect.width;
    viewportHeight.value = rect.height;
  }

  // set vertical screen to true if width is smaller than height
  if (viewportWidth.value < viewportHeight.value) {
    isVertical.value = true;
  }
})

// updates isPlaying and sets score when gameover is received from GameWindowComponent
function setGameOver(newScore: number): void {
  isPlaying.value = !isPlaying.value
  score.value = newScore;
}

// Restarts the game
function restartGame(): void {
  isPlaying.value = !isPlaying.value;
}

// Brings the player back to the main menu
function goBackToMenu(): void {
  router.push('/');
}
</script>

<template>
  <div id="viewport">
    <!-- display for screens with invalid ratios -->
    <div
      v-if="isVertical"
    >
      <h1
        id="vertical-warning"
      >
        This game works better in horizontal model, please rotate your device in order to improve your experience.
      </h1>
    </div>
    <div
      v-if="!isVertical"
    >
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
  </div>
</template>

<style scoped>
#viewport {
  display: flex;
  justify-content: center;
  align-items: center;
}

#vertical-warning {
  position: absolute;
  width: 100%;
  left: 0;
  top: 30%;
  padding: 5%;
  text-align: center;
  font-size: 2rem;
}
</style>
