Creates a bird component.
<script setup lang="ts">
  defineProps({
    birdWidth: Number,
    birdHeight: Number,
    color: String,
    birdX: Number, // Used to set the absolute position
    birdY: Number, // Used to set the absolute position
  })

</script>


<template>
  <!-- Creates a bigger hit box for the ease of use -->
  <div
    class="hit-box"
    :style="{
      width: `${birdWidth as number * 3}px`,
      height: `${birdHeight as number * 3}px`,
      position: 'absolute',
      left: `${birdX as number - (birdWidth as number)}px`,
      top: `${birdY as number - (birdHeight as number)}px`,
    }"
  >
    <!-- Creates the visible bird itself -->
    <div
      class="bird"
      :style="{
        width: `${birdWidth}px`,
        height: `${birdHeight}px`,
        backgroundColor: color,
        position: 'relative',
        left: `${birdWidth}px`,
        top: `${birdHeight}px`,
      }"
    ></div>
  </div>
</template>


<style scoped>

</style>
