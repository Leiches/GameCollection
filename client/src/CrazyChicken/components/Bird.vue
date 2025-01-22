<script setup lang="ts">
  defineProps({
    birdWidth: Number,
    birdHeight: Number,
    color: String,
    birdX: Number,
    birdY: Number,
  });
</script>

<template>
  <div
    :style="{
      width: `${birdWidth}px`,
      height: `${birdHeight}px`,
      backgroundColor: color,
      position: 'absolute',
      left: `${birdX}px`,
      top: `${birdY}px`,
    }"
  >
  </div>
</template>
