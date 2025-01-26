<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BirdComponent from '@/CrazyChicken/components/BirdComponent.vue';
import { reactive } from 'vue';
import { LinkedList } from '@/CrazyChicken/utils/custom-types/LinkedList';
import type { Point } from '@/CrazyChicken/utils/custom-types/Point';
import { randomRange } from '@/CrazyChicken/utils/functions/randomRange';
import { BirdObject } from '@/CrazyChicken/scripts/BirdObject';
import ScoreBoxComponent from '@/CrazyChicken/components/ScoreBoxComponent.vue';
import RifleComponent from '@/CrazyChicken/components/RifleComponent.vue';
import AmmunitionCounterComponent from '@/CrazyChicken/components/AmmunitionCounterComponent.vue';

const props = defineProps({
  gameWindowWidth: Number,
  gameWindowHeight: Number,
})

const emit = defineEmits(["gameover"]);

const cooldown = ref(0);
const score = ref(0);

const birds: LinkedList<BirdObject> = reactive(new LinkedList<BirdObject>());
const birdColors: string[] = ['#67ff92', '#2a535b', '#fdab00'];

const ammoLeft = ref(5);
const maxAmmo = 5;

const isBlastVisible = ref(false);

function spawnBird() {
  const max: number = props.gameWindowWidth / 20;
  const min: number = props.gameWindowWidth / 25;
  const width = Math.random() * (max - min) + min;
  const height = Math.random() * (max - min) + min;

  const startPoint: Point = {
    x: Math.random() < 0.5 ? -max : props.gameWindowWidth as number + max,
    y: Math.random() * (props.gameWindowHeight as number - height),
  };

  const endPoint: Point = {
    x: startPoint.x === -max ? props.gameWindowWidth as number + max : -max,
    y: Math.random() * (props.gameWindowHeight as number - height),
  };

  let isBadBird: boolean;
  let randomColor;

  if (Math.random() < 0.9) {
    randomColor = randomRange(birdColors);
    isBadBird = false;
  } else {
    randomColor = '#ff0000'
    isBadBird = true;
  }
  const speed = Math.random() * (0.01- 0.005) + 0.005;

  const diffRand: number = Math.random();
  let difficulty: number = 0;

  if (diffRand < 0.6) {
    difficulty = 1;
  } else if (diffRand < 0.8) {
    difficulty = 2;
  } else if (diffRand < 0.95) {
    difficulty = 3;
  } else {
    difficulty = 4;
  }

  const b = new BirdObject(
    width,
    height,
    randomColor,
    startPoint,
    endPoint,
    speed,
    props.gameWindowHeight as number,
    difficulty,
    isBadBird
  );
  birds.insertEnd(b);
}

function shoot() {
  if (ammoLeft.value > 0) {
    ammoLeft.value--; // Decrease ammo
    const audio = new Audio('src/CrazyChicken/assets/rifle-gunshot-99749.mp3');
    audio.play();

    isBlastVisible.value = true;
    setTimeout(() => {
      isBlastVisible.value = false;
    }, 500);
  }
}

function destroy(bird: any) {
  if (ammoLeft.value > 0) {
    const node = birds.search((n) => n === bird);
    if (node) {
      birds.delete(node);
      if (bird.isBadBird) {
        score.value -= 5;
        if (score.value < 0) {
          score.value = 0;
          ammoLeft.value--;
        }
      } else {
        score.value++;
        if (ammoLeft.value < maxAmmo) {
          ammoLeft.value++;
        }
        ammoLeft.value++;

      }
    }
    shoot();
  }
}

// Start the game loop
onMounted(() => {

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
        bird.currentPoint.x > (props.gameWindowWidth as number + 80)
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

    if (ammoLeft.value == 0) {
      emit("gameover", score.value);
    }

  }, 16);
});

function handleAmmoDecrement() {
  if (ammoLeft.value > 0) {
    ammoLeft.value--;
    if (ammoLeft.value == 0) {
      emit("gameover", score.value);
    }
  }
}

</script>


<template>

  <div id="game-window">
    <RifleComponent
      :game-window-width="gameWindowWidth"
      :game-window-height="gameWindowHeight"
      :is-blast-visible="isBlastVisible"
      :ammo-left="ammoLeft"
      @click="shoot"
      @decrement-ammo="handleAmmoDecrement"
    ></RifleComponent>
    <AmmunitionCounterComponent :ammo-left="ammoLeft"></AmmunitionCounterComponent>
    <BirdComponent
      v-for="(bird, index) in birds.traverse()"
      :key="index"
      :bird-height="bird.height"
      :bird-width="bird.width"
      :color="bird.color"
      :bird-x="bird.currentPoint.x"
      :bird-y="bird.currentPoint.y"
      @click="destroy(bird)"
    >
    </BirdComponent>
    <ScoreBoxComponent :score="score"></ScoreBoxComponent>
  </div>
</template>


<style scoped>
#game-window {
  position: relative;
  width: 900px;
  height: 625px;
  background-color: lightgray;
  overflow: hidden;
}

@media (max-width: 900px) {
  #game-window {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}
</style>
