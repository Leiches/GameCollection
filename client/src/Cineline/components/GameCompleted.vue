<script setup lang="ts">
    import { onMounted, ref } from "vue";
    import { saveHighScore, loadHighScore, fetchLeaderboard } from "@/util/scoreManager";

    const props = defineProps<{
        score: number
    }>()

    const highScore = ref<number | null>(null);
    const leaderboard = ref<{ userName: string; score: number }[]>([]);

    onMounted(async () => {
        const gameName = "CineLine";

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
        <h1>Congratulations you finished the game!</h1>
        <h1>Score: {{ score }}</h1>
        <h1>Highscore: {{ highScore !== null ? highScore : 'Loading...' }}</h1>
        <router-link to="/CineLine/splashscreen">Start a new game</router-link>
        <router-link to="/">Back to the Game collection</router-link>
        <div id="leaderboard">
            <h1 class="leaderboard-header">Leaderboard</h1>
            <ul v-if="leaderboard.length" class="leaderboard-list">
                <li v-for="(entry, index) in leaderboard" :key="index" class="leaderboard-item">
                <span class="rank">{{ index + 1 }}. </span>
                <span class="name">{{ entry.userName }} - </span>
                <span class="score">{{ entry.score }}</span>
                </li>
            </ul>
            <p v-else>No scores available yet.</p>
        </div>
</template>

<style>

</style>