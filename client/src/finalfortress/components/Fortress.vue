<script setup lang="ts">

import Wall from "@/finalfortress/components/Wall.vue";
</script>

<template>
  <div id="fortress-wrapper">
    <div id="wall-container">
      <Wall></Wall>
      <Wall></Wall>
      <Wall></Wall>
    </div>
    <div id="tower-container">

    </div>
  </div>
</template>

<style scoped>
  #fortress-wrapper {
    position: relative;
    min-width: 10vw; /* Necessary bc for some reason it wouldn´t work with width */
    height: 100vh;
    display: flex;
    flex-direction: row-reverse;
  }

  #wall-container {
    position: relative;
    display: flex;
  }
</style>
