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
    height: 95%;
    width: 8%;
    margin: 2%;
    border: 2px solid slategrey;
    border-radius: 6%;
    position: relative;
  }
  .ammo-deco {
    background: goldenrod;
    width: 100%;
    height: 30%;
    position: absolute;
    bottom: 0;
    border-left: 2px solid slategrey;
    border-right: 2px solid slategrey;
  }
  .ammo-bottom {
    background: goldenrod;
    width: 130%;
    height: 15%;
    position: absolute;
    bottom: -2%;
    left: -18%;
    border-radius: 5px;
    border: 2px solid slategrey;
    border-top: 0;
  }
</style>
