<script setup lang="ts">
defineProps({
  width: Number,
  height: Number,
  xCoordinate: Number,
  yCoordinate: Number,
  positionIdentifier: String,
})
</script>

<template>
  <a
    class="aim-layer"
    :style="{
      width: `${width}px`,
      height: `${height}px`,
      position: 'absolute',
      top: `${yCoordinate}px`,
      left: `${xCoordinate}px`,
    }"
  >

  </a>
</template>

<style scoped>
  .aim-layer {
    color: transparent;
    text-decoration: none;
    outline: none;
  }

  /*Making extra sure that there aren no visual effects*/
  .aim-layer:hover,
  .aim-layer:focus,
  .aim-layer:active {
    color: transparent;
    text-decoration: none;
    outline: none;
    background-color: transparent;
    border: none;
    box-shadow: none;
  }
</style>
