<script setup lang="ts">
import AimLayerComponent from '@/CrazyChicken/components/AimLayerComponent.vue'
import {ref } from "vue";

const props = defineProps({
  isBlastVisible: Boolean,
  gameWindowWidth: Number,
  gameWindowHeight: Number,
  ammoLeft: Number,
})

const emit = defineEmits(["decrement-ammo"]);

const upperAimLayers: string[] = ['top-left', 'center', 'top-right']
const lowerAimLayers: string[] = ['bottom-left', 'center', 'bottom-right']

const angle = ref(0);

function aim(aimLayer: string) {
  if (aimLayer === 'bottom-left') {
    angle.value = 300
  } else if (aimLayer === 'top-left') {
    angle.value = 330
  } else if (aimLayer === 'center') {
    angle.value = 0
  } else if (aimLayer === 'top-right') {
    angle.value = 30
  } else if (aimLayer === 'bottom-right') {
    angle.value = 60
  }
}

let localIsBlastVisible = false;

function shoot() {
  if (props.ammoLeft as number > 0)
  {
    const audio = new Audio('src/CrazyChicken/assets/rifle-gunshot-99749.mp3'); // Source: https://pixabay.com/sound-effects/rifle-gunshot-99749/
    audio.play()
    localIsBlastVisible = true;
    setTimeout(() => {
      localIsBlastVisible = false;
    }, 500);

    emit("decrement-ammo");
  }

}
</script>

<template>
  <AimLayerComponent
    v-for="(aimLayer, index) in upperAimLayers"
    :key="index"
    :width="(gameWindowWidth as number) / 3"
    :height="(gameWindowHeight as number) /2"
    :x-coordinate="((gameWindowWidth as number) / 3) * index"
    :y-coordinate="0"
    :position-identifier="aimLayer"
    @mouseover="aim(aimLayer)"
    @click="shoot"
  >
  </AimLayerComponent>
  <AimLayerComponent
    v-for="(aimLayer, index) in lowerAimLayers"
    :key="index"
    :width="(gameWindowWidth as number) / 3"
    :height="(gameWindowHeight as number) /2"
    :x-coordinate="((gameWindowWidth as number) / 3) * index"
    :y-coordinate="(gameWindowHeight as number) /2"
    :position-identifier="aimLayer"
    @mouseover="aim(aimLayer)"
    @click="shoot"
  >
  </AimLayerComponent>
  <div
    id="rifle"
    :style="{
      left: `${(gameWindowWidth as number / 2) - 20}px`,
      transform: `rotate(${angle}deg)`,
    }"
  >
    <div
      id="rifle-deco"
    >
      <div
        id="blast"
        v-if="isBlastVisible || localIsBlastVisible"
      >

      </div>
    </div>
  </div>
</template>

<style scoped>
#rifle {
  width: 40px;
  height: 140px;
  position: absolute;
  bottom: -20px;
  background-color: #603e29;
  transform-origin: center bottom;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
#rifle-deco {
  width: 20px;
  height: 110px;
  position: relative;
  left: 10px;
  bottom: 10px;
  background-color: #736a6a;
  transform-origin: center bottom;
  border-radius: 5px;
}
#blast {
  position: relative;
  bottom: 115px;
  left: -15px;
  width: 50px;
  height: 120px;
  background-color: #fff400;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  border-top-left-radius: 80%;
  border-top-right-radius: 80%;
  opacity: 70%;
}
</style>

