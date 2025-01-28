<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BirdComponent from '@/Crazychicken/components/BirdComponent.vue';
import { reactive } from 'vue';
import { LinkedList } from '@/Crazychicken/utils/custom-types/LinkedList';
import type { Point } from '@/Crazychicken/utils/custom-types/Point';
import { randomRange } from '@/Crazychicken/utils/functions/randomRange';
import { BirdObject } from '@/Crazychicken/scripts/BirdObject';
import ScoreBoxComponent from '@/Crazychicken/components/ScoreBoxComponent.vue';
import RifleComponent from '@/Crazychicken/components/RifleComponent.vue';
import AmmunitionCounterComponent from '@/Crazychicken/components/AmmunitionCounterComponent.vue';

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

// Spawns a bird at a random location
function spawnBird() {
  // Create random width and height based on window size
  const max: number = props.gameWindowWidth as number/ 20;
  const min: number = props.gameWindowWidth as number/ 25;
  const width = Math.random() * (max - min) + min;
  const height = Math.random() * (max - min) + min;

  // sets start and endpoint outside the visible playing field
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

  // Creates a "bad" bird in 10% of cases that harms the player when shooting it
  if (Math.random() < 0.9) {
    randomColor = randomRange(birdColors);
    isBadBird = false;
  } else {
    randomColor = '#ff0000'
    isBadBird = true;
  }

  // sets random speed
  const speed = Math.random() * (0.01- 0.005) + 0.005;

  const diffRand: number = Math.random();
  let difficulty: number = 0;
  // Sets random bird difficulty (Based on the number of "control points" in bezier curve)
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
  // adds the new bird to the linked list
  birds.insertEnd(b);
}

// play shoot "animation"
function shoot() {
  if (ammoLeft.value > 0) {
    ammoLeft.value--; // Decrease ammo
    // Play gun sound
    const audio = new Audio('src/Crazychicken/assets/rifle-gunshot-99749.mp3');
    audio.volume = 0.4;
    audio.play();

    isBlastVisible.value = true;
    setTimeout(() => {
      isBlastVisible.value = false;
    }, 500);
  }
}

// takes a bird and destroys it
function destroy(bird: any) {
  if (ammoLeft.value > 0) {
    // Find bird in linked list
    const node = birds.search((n) => n === bird);
    if (node) {
      // Delete it
      birds.delete(node);
      // Decrease score and ammo if it was a bad bird
      if (bird.isBadBird) {
        score.value -= 5;
        if (score.value < 0) {
          score.value = 0;
          ammoLeft.value--;
        }
      }
      // Increase score and ammo by 1 if it was a good bird
      else {
        score.value++;
        if (ammoLeft.value < maxAmmo) {
          ammoLeft.value++;
        }
        ammoLeft.value++;

      }
    }
    // Play the shoot animation
    shoot();
  }
}

// Start the game loop
onMounted(() => {

    setInterval(() => {
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
      // Despawn birds when they leave the screen / Reach their endpoint
      if (
        bird.progress >= 1 ||
        bird.currentPoint.x < -80 ||
        bird.currentPoint.x > (props.gameWindowWidth as number + 80)
      ) {
        birdsToDelete.push(bird);
      }
    }

    /* Deletes all birds in the birdsToDelete array
    *  This is done here for ease of use and because it worked smoother
    * */
    for (const bird of birdsToDelete) {
      const node = birds.search((n) => n === bird);
      if (node) {
        birds.delete(node);
      }
    }

    // Sends gameover signal if there is no ammunition left
    if (ammoLeft.value == 0) {
      emit("gameover", score.value);
    }

  }, 16);
});

// Decreases ammo if a shot misses its target
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
    <!-- Rifle Component that can play the shoot animation and devrease ammo -->
    <RifleComponent
      :game-window-width="gameWindowWidth"
      :game-window-height="gameWindowHeight"
      :is-blast-visible="isBlastVisible"
      :ammo-left="ammoLeft"
      @click="shoot"
      @decrement-ammo="handleAmmoDecrement"
    ></RifleComponent>
    <!-- UI to display the remaining ammunition -->
    <AmmunitionCounterComponent :ammo-left="ammoLeft"></AmmunitionCounterComponent>
    <!-- Loop through bird components and update their positions / destroy them when clicked on-->
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
    <!-- UI to display the current score -->
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

/* Adjust window size and position on smaller screens */
@media (max-width: 900px) {
  #game-window {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}
</style>
