<script setup lang="ts">

let items = ["A", "B", "C", "D", "E", "F"];
</script>

<template>
  <div class="upgrade-menu test-pos">
    <div class="center-block">
    </div>
    <div class="option"
         v-for="(item, index) in items"
         :style="{ transform: `rotate(${index * (360/items.length)}deg)`}"

      >
      <p class="option-button">{{ item }}
      </p>
      <div class="border-left"></div>

    </div>
  </div>
</template>

<style scoped>
  .upgrade-menu {
    margin-top: 50px;
    margin-left: 30px;

    position: relative;
    min-width: 16vw;
    height: 16vw;
    border-radius: 100%;
    background: black;
    z-index: 10;

    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }

  .center-block {
    position: absolute;
    border-radius: 100%;
    width: 5vw;
    height: 5vw;
    border: 0.2vw solid white;
  }

  .border-left {
    border-left: 1px solid white;
    position: absolute;
    top: 10.5vw;
    bottom: 0;
  }

  .option {
    position: absolute;
    height: 5.5vw;
    padding-bottom: 16vw;
  }

  .option-button:hover {
    background-color: white;
    color: black;
    z-index: 0;
  }

  .option-button {
    position: absolute;
    justify-self: center;
    align-self: center;
    width: 8vw;
    height: 8vw;
  }
</style>
