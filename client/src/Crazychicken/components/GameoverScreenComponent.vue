<script setup lang="ts">
import { onMounted, ref } from "vue";
import { saveHighScore, loadHighScore } from "@/util/scoreManager";

const props = defineProps({
  score: Number,
  gameWindowHeight: Number,
  gameWindowWidth: Number,
});

const highScore = ref<number | null>(null);
const emit = defineEmits(["restartGame", "back"]);

onMounted(async () => {
  const gameName = "CrazyChicken";
  highScore.value = await loadHighScore(gameName);

  if (props.score > (highScore.value || 0)) {
    await saveHighScore(gameName, props.score as number);
    highScore.value = props.score;
  }
});
</script>

<template>
  <div
    id="gameover-screen"
    :style="{ width: `${gameWindowWidth}px`, height: `${gameWindowHeight}px` }"
  >
    <h1
      id="score-display"
      :style="{ top: `${gameWindowHeight / 2 - 130}px` }"
    >
      FINAL SCORE: {{ score }}
    </h1>
    <h1
      id="high-score-display"
      :style="{ top: `${gameWindowHeight / 2 - 90}px` }"
    >
      HIGH SCORE: {{ highScore !== null ? highScore : 'Loading...' }}
    </h1>
    <button
      id="restart"
      @click="emit('restartGame')"
    >
      RESTART
    </button>
    <button
      id="back-button"
      @click="emit('back')"
    >
      BACK TO MENU
    </button>
  </div>
</template>

<style scoped>
#gameover-screen {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

#score-display {
  position: absolute;
}

#restart {
  margin-top: 15px;
}

button {
  height: 30px;
  width: 120px;
  margin: 5px;
  background-color: transparent;
  border: gray 1px solid;
  color: gray;
}

#restart:hover {
  background-color: #4ac77e;
  color: white;
  cursor: pointer;
}

#back-button:hover {
  background-color: white;
  color: black;
  cursor: pointer;
}

button:hover {
  box-shadow: 2px 2px 2px gray;
}
</style>

