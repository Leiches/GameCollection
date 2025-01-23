<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Bird from '@/CrazyChicken/components/Bird.vue'
import { reactive } from "vue";
import { LinkedList } from '@/CrazyChicken/utils/custom-types/LinkedList'
import type { Point } from "@/CrazyChicken/utils/custom-types/Point"
import { randomRange } from "@/CrazyChicken/utils/functions/randomRange";
import { BirdObject} from "@/CrazyChicken/scripts/BirdObject";
import ScoreBox from "@/CrazyChicken/components/ScoreBox.vue";

const gameWindowWidth = ref(0);
const gameWindowHeight = ref(0);

const cooldown = ref(0);
let score = ref(0);

const birds: LinkedList<BirdObject> = reactive(new LinkedList<BirdObject>())
const birdColors: string[] = ['#ff6767', '#2a535b', '#fdab00']

function spawnBird() {
  const width = Math.random() * (50 - 30) + 30;
  const height = Math.random() * (50 - 30) + 30;

  const startPoint: Point = {
    x: Math.random() < 0.5 ? -50 : gameWindowWidth.value + 50,
    y: Math.random() * (gameWindowHeight.value - height),
  };

  const endPoint: Point = {
    x: startPoint.x === -50 ? gameWindowWidth.value + 50 : -50,
    y: Math.random() * (gameWindowHeight.value - height),
  };

  const randomColor = randomRange(birdColors);
  const speed = Math.random() * (0.005 - 0.003) + 0.003;

  const b = new BirdObject(width, height, randomColor, startPoint, endPoint, speed, gameWindowHeight.value);
  birds.insertEnd(b);
}

function destroy(bird: any)
{
  const node = birds.search((n) => n === bird);
  if (node) {
    birds.delete(node);
    score.value++;
  }

}


// Start the game loop
onMounted(() => {
  const gameWindow = document.getElementById("game-window");
  if (gameWindow) {
    const rect = gameWindow.getBoundingClientRect();
    gameWindowWidth.value = rect.width;
    gameWindowHeight.value = rect.height;
  }

  const gameLoop = setInterval(() => {
    // Spawn birds if necessary
    if (birds.size() < 3) {
      spawnBird();
      cooldown.value = 1200;
    }

    if (cooldown.value > 0) {
      cooldown.value -= 50;
    }


    // Move all birds
    const birdsArr = birds.traverse();
    const birdsToDelete: BirdObject[] = [];

    for (const bird of birdsArr) {
      bird.move(); // 16ms time delta for 60FPS
      if (
        bird.progress >= 1 ||
        bird.currentPoint.x < -80 ||
        bird.currentPoint.x > gameWindowWidth.value + 80
      ) {
        birdsToDelete.push(bird);
      }

    }

    for (const bird of birdsToDelete) {
      const node = birds.search((n) => n === bird);
      if (node) {
        birds.delete(node);
      }
    }

  }, 16);
});

</script>

<template>
  <div id="game-window">
    <Bird
      v-for="(bird, index) in birds.traverse()"
      :key="index"
      :bird-height="bird.height"
      :bird-width="bird.width"
      :color="bird.color"
      :bird-x="bird.currentPoint.x"
      :bird-y="bird.currentPoint.y"
      @click="destroy(bird)"
    >
    </Bird>
    <ScoreBox :score="score"></ScoreBox>
  </div>
</template>

<style scoped>
#game-window {
  position: relative;
  width: 900px;
  height: 675px;
  background-color: lightgray;
  overflow: hidden;
}
</style>
