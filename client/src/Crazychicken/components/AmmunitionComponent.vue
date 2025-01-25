<script setup lang="ts">
defineProps({
  xCoordinate: Number,
  yCoordinate: Number,
})
</script>

<template>
  <div class="ammo-main">
    <div class="ammo-deco"></div>
    <div class="ammo-bottom"></div>
  </div>
</template>

<style scoped>
  .ammo-main {
    background: #ff0000;
    height: 120px;
    width: 30px;
    margin: 5px;
    border: 4px solid slategrey;
    border-radius: 10px;
    position: relative;
  }
  .ammo-deco {
    background: goldenrod;
    width: 30px;
    height: 30px;
    position: absolute;
    bottom: 0;
    left: -4px;
    border-left: 4px solid slategrey;
    border-right: 4px solid slategrey;
  }
  .ammo-bottom {
    background: goldenrod;
    width: 38px;
    height: 15px;
    position: absolute;
    bottom: -10px;
    left: -8px;
    border-radius: 5px;
    border: 4px solid slategrey;
    border-top: 0;
  }
</style>
