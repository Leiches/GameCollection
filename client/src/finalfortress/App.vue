<script setup lang="ts">
import GameWindow from "@/finalfortress/components/GameWindow.vue";
</script>

<template>
  <div id="main">
    <GameWindow/>
  </div>
</template>

<style scoped>
  #main {
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
