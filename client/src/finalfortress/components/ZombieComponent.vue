<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface ZombieProps {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  color: string;
}

const props = defineProps<ZombieProps>();

const emit = defineEmits(["destroy"]);

function handleDestroy() {
  emit("destroy");
}

</script>

<template>
  <div
      class="moveable"
      :style="{
      width: `${props.width}vw`,
      height: `${props.height}vw`,
      backgroundColor: props.color,
      transform: `translate(${props.positionX}px, ${props.positionY}px)`
      }"
      @click="handleDestroy"
  ></div>
</template>

<style scoped>
.moveable {
  all: unset;
  position: absolute;
  transition: transform 0.1s ease; /* Smooth transition */
  cursor: pointer;
}
</style>
