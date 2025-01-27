<script setup lang="ts">
    import { ref } from 'vue';
    import Game from '../Game.vue'
    import GameCompleted from '../GameCompleted.vue';

    const isPlaying = ref(true);
    const score = ref(1000)

    const handleGameEnd = (newScore: number) => {
        score.value = newScore
        isPlaying.value = false;
    }
</script>

<template>
    <Suspense v-if="isPlaying">
        <Game @endGame="handleGameEnd"/>
    </Suspense>
    <GameCompleted v-if="!isPlaying" :score="score"/>
</template>

<style>

</style>