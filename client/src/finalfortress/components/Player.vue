<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import ZombieComponent from "@/finalfortress/components/ZombieComponent.vue";

// Define the props interface
interface PlayerProps {
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  color: string;
}

// Props declaration
const props = defineProps<PlayerProps>();

// Local reactive states
const positionX = ref(props.positionX);
const positionY = ref(props.positionY);
const health = ref(100);

// Handle keydown events
function handleKeyDown(event: KeyboardEvent) {
  const keyActions: Record<string, () => void> = {
    ArrowLeft: () => move(-10, 0),
    ArrowRight: () => move(10, 0),
    ArrowUp: () => move(0, -10),
    ArrowDown: () => move(0, 10),
  };

  if (keyActions[event.key]) {
    event.preventDefault();
    keyActions[event.key]();
  }
}

function move(newX: number, newY: number)
{
  positionX.value += newX;
  positionY.value += newY;
  console.log(positionX.value + " | " + positionY.value);
}

// Add and clean up event listeners
window.addEventListener("keydown", handleKeyDown);

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<template>
  <ZombieComponent
      :width="props.width"
      :height="props.height"
      :positionX="positionX"
      :positionY="positionY"
      :color="props.color"
  >
    <div class="player">
    </div>
  </ZombieComponent>
</template>

<style scoped>
.player {
  text-align: center;
}
</style>
