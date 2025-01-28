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

  // Loads highScore from backend
  highScore.value = await loadHighScore(gameName);

  // Checks whether the new score is higher than the high score and saves it if this is the case
  if (props.score > (highScore.value || 0) || highScore.value === 0) {
    await saveHighScore(gameName, props.score as number);
    highScore.value = props.score;
  }

  // Gets the leaderboard for the game and sorts it
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
  >
    <h1
      id="score-display"
    >
      FINAL SCORE: {{ score }}
    </h1>
    <h1
      id="high-score-display"
    >
      HIGH SCORE: {{ highScore !== null ? highScore : 'Loading...' }}
    </h1>
    <button
      id="restart"
      @click="emit('restartGame')"
    >
      RESTART GAME
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
  width: 100vw;
  height: 100vh;
}

#score-display {
  position: absolute;
  top: 20%;
}

#high-score-display {
  position: absolute;
  top: 30%;
}

#restart {
  margin-top: 2%;
}

#leaderboard {
  position: absolute;
  right: 0;
  text-align: left;
  padding: 2%;
  border-radius: 10%;
}

/* Adapted leaderboard positions on smaller screens */
@media (max-width: 1100px) {
  #leaderboard {
    position: static;
    margin-top: 1rem;
    text-align: center;
    width: 25%;
  }

  #score-display {
    top: 5%;
  }

  #high-score-display {
    top: 15%
  }
}

@media (max-width: 900px) {
  #leaderboard {
    position: static;
    margin-top: 1rem;
    text-align: center;
    width: 40%;
  }

  /* Additionally reallign buttons by increasing the margin betwenn the upper restart button and the score h1s */
  #restart {
    margin-top: 10%;
  }
}


@media (max-width: 500px) {
  #leaderboard {
    position: static;
    margin-top: 1rem;
    text-align: center;
    width: 100%;
  }
}

.leaderboard-header {
  text-align: center;
  margin-bottom: 2%;
}

.leaderboard-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.leaderboard-item {
  display: flex;
  justify-content: space-between;
  padding: 1% 0;
  border-bottom: 1px solid gray;
}

.leaderboard-item:last-child {
  border-bottom: none;
}

.rank {
  width: 10%;
  text-align: left;
}

.name {
  flex-grow: 1;
  text-align: left;
  padding-left: 2%;
}

.score {
  width: 50%;
  text-align: right;
}

button {
  min-height: 6%;
  min-width: 10%;
  margin: 0.5%;
  background-color: transparent;
  border: gray 1px solid;
  color: gray;
  font-size: 100%;
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

