<script setup lang="ts">

import AmmunitionComponent from "@/CrazyChicken/components/AmmunitionComponent.vue";

defineProps({
  ammoLeft: Number,
})
</script>

<template>
  <div id="ammunition-wrapper">
    <AmmunitionComponent
      v-for="(ammo, index) in ammoLeft"
      :key="index"
    >

    </AmmunitionComponent>
  </div>

</template>

<style scoped>
  #ammunition-wrapper {
    display: flex;
    position: absolute;
    bottom: 0;
    margin: 2%;
    opacity: 50%;
    width: 50%;
    height: 30%;
  }
</style>
