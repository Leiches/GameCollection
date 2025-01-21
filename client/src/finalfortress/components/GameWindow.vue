<script setup lang="ts">
import {ref, onMounted, computed} from "vue";
import { Zombie} from "@/finalfortress/scripts/Zombie";
import ZombieComponent from "@/finalfortress/components/ZombieComponent.vue";
import Fortress from "@/finalfortress/components/Fortress.vue";
import {LinkedList} from "@/finalfortress/scripts/custom-types/LinkedList";
import {ListItem} from "@/finalfortress/scripts/custom-types/ListItem";

const zombies = new LinkedList<Zombie>();
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
  zombies.add(new ListItem<Zombie>(newZombie));
  cooldown.value = 400;
}

function moveZombies() {
  const zombieList = zombies.traverse();
  zombieList.forEach((zombie) => {
    const dx = randomInt(-5, 1);
    const dy = randomInt(-3, 3);
    zombie.move(dx, dy);

    zombie.positionX = Math.max(0, Math.min(zombie.positionX, gameWindowWidth.value - zombie.width));
    zombie.positionY = Math.max(0, Math.min(zombie.positionY, gameWindowHeight.value - zombie.height));
  });
}

function removeZombie(zombie: Zombie) {
  const zombieListItem = zombies.find(zombie);
  if (zombieListItem) {
    zombies.remove(zombieListItem); // Properly remove the item from the linked list
    cooldown.value = 1000;
  }
}

const cooldown = ref(0);

const zombieArray = computed(() => zombies.traverse());

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
    if (zombies.size() < 10 && cooldown.value == 0) {
      spawnZombie();
    }
    else if (cooldown.value > 0)
    {
      cooldown.value -= 100;
    }

    // Move all zombies
    moveZombies();

  // Add any additional game logic here (e.g., collision detection, scoring)
  }, 100);
});
</script>

<template>
  <div id="game-window">
    <Fortress></Fortress>
    <ZombieComponent
      v-for="(zombie, index) in zombieArray"
      :key="index"
      class="zombie"
      :width="zombie.width"
      :height="zombie.height"
      :color="zombie.color"
      :positionX="zombie.positionX"
      :positionY="zombie.positionY"
      @destroy="removeZombie(zombie)"
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
