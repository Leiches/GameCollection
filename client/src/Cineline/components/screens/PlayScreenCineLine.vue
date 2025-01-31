<script setup lang="ts">
    import { ref } from 'vue';
    import Game from '../Game.vue'
    import GameCompleted from '../GameCompleted.vue';

    const isPlaying = ref(true);
    const score = ref(1000)

    // if game ends, Endscreen is rendered
    const handleGameEnd = (newScore: number) => {
        score.value = newScore
        isPlaying.value = false;
    }
</script>

<template>
    <div class="cineline-container">
        <Suspense v-if="isPlaying">
            <Game @endGame="handleGameEnd"/>
        </Suspense>
        <GameCompleted v-if="!isPlaying" :score="score"/>
    </div>
</template>

<style>
    .cineline-container {
        width: 100%;
        height: 100vh;
        padding: 20px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 12px;
    }
</style>