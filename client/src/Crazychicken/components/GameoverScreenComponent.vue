<script setup lang="ts">
import { onMounted, ref } from "vue";
import { saveHighScore, loadHighScore, fetchLeaderboard } from "@/util/scoreManager";

const props = defineProps({
  score: Number,
  gameWindowHeight: Number,
  gameWindowWidth: Number,
});

const highScore = ref<number | null>(null);
const leaderboard = ref<{ userName: string; score: number }[]>([]);
const emit = defineEmits(["restartGame", "back"]);

onMounted(async () => {
  const gameName = "CrazyChicken";

  highScore.value = await loadHighScore(gameName);

  if (props.score > (highScore.value || 0) || highScore.value === 0) {
    await saveHighScore(gameName, props.score as number);
    highScore.value = props.score;
  }

  const scores = await fetchLeaderboard(gameName);
  if (scores && typeof scores === "object") {
    leaderboard.value = Object.entries(scores)
      .map(([userName, score]) => ({ userName, score }))
      .sort((a, b) => b.score - a.score);
  } else {
    leaderboard.value = [];
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
    <div id="leaderboard">
      <h1 class="leaderboard-header">Leaderboard</h1>
      <ul v-if="leaderboard.length" class="leaderboard-list">
        <li v-for="(entry, index) in leaderboard" :key="index" class="leaderboard-item">
          <span class="rank">{{ index + 1 }}.</span>
          <span class="name">{{ entry.userName }}</span>
          <span class="score">{{ entry.score }}</span>
        </li>
      </ul>
      <p v-else>No scores available yet.</p>
    </div>

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

#leaderboard {
  position: absolute;
  right: 0;
  text-align: left;
  padding: 10px;
  border-radius: 8px;
}

.leaderboard-header {
  text-align: center;
  margin-bottom: 10px;
}

.leaderboard-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.leaderboard-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid gray;
}

.leaderboard-item:last-child {
  border-bottom: none;
}

.rank {
  width: 30px;
  text-align: left;
}

.name {
  flex-grow: 1;
  text-align: left;
  padding-left: 10px;
}

.score {
  width: 50px;
  text-align: right;
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

