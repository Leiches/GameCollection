<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Zombie} from "@/finalfortress/scripts/Zombie";
import ZombieComponent from "@/finalfortress/components/ZombieComponent.vue";
import Fortress from "@/finalfortress/components/Fortress.vue";
import UpgradeMenu from "@/finalfortress/components/UpgradeMenu.vue";

const zombies = ref<Zombie[]>([]);
const gameWindowWidth = ref(0);
const gameWindowHeight = ref(0);

const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;

function spawnZombie() {
  const newZombie = new Zombie(
      2,
      2,
      gameWindowWidth.value - 20,
      randomInt(10, gameWindowHeight.value - 10),
      "green"
  );
  zombies.value.push(newZombie);
  cooldown = 400;
}

function moveZombies() {
  zombies.value.forEach((zombie) => {
    const dx = randomInt(-5, 1);
    const dy = randomInt(-3, 3);
    zombie.move(dx, dy);

    zombie.positionX = Math.max(0, Math.min(zombie.positionX, gameWindowWidth.value - zombie.width));
    zombie.positionY = Math.max(0, Math.min(zombie.positionY, gameWindowHeight.value - zombie.height));
  });
}

// REWORK WITH LIST
function removeZombie(index: number) {
  zombies.value.splice(index, 1); // Remove the zombie at the given index
  cooldown = 1000;
}

let cooldown = 0;

// Start the game loop
onMounted(() => {

  const gameWindow = document.getElementById("game-window");
  if (gameWindow) {
    const rect = gameWindow.getBoundingClientRect();
    gameWindowWidth.value = rect.width;
    gameWindowHeight.value = rect.height;
  }

  const gameLoop = setInterval(() => {
    // Spawn zombies if the count is below the limit
    if (zombies.value.length < 10 && cooldown == 0) {
      spawnZombie();
    }
    else if (cooldown > 0)
    {
      cooldown -= 100;
    }

    // Move all zombies
    moveZombies();

    // Add any additional game logic here (e.g., collision detection, scoring)
  }, 100);
});
</script>

<template>
  <div id="game-window">
    <UpgradeMenu></UpgradeMenu>
    <Fortress></Fortress>
    <ZombieComponent
        v-for="(zombie, index) in zombies"
        :key="'zombie-' + index"
        class="zombie"
        :width="zombie.width"
        :height="zombie.height"
        :color="zombie.color"
        :positionX="zombie.positionX"
        :positionY="zombie.positionY"
        @destroy="removeZombie(index)"
    ></ZombieComponent>
  </div>
</template>


<style scoped>
  div {
    background-color: lightgray;
    min-width: 100%;
    min-height: 100%;
    margin: 0;
    padding: 0;
    display: flex;
    overflow: hidden;
  }
</style>
