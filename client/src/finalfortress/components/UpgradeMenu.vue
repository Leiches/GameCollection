<script setup lang="ts">

let items = ["A", "B", "C", "D", "E", "F"];
</script>

<template>
  <div style="all: unset">
    <div class="option-menu-deco"></div>
    <div class="option-menu">
      <div class="option"
           v-for="item in items"
      >
        <div class="option-content">
          {{ item }}
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
  .option-menu {
    position: absolute;

    left:300px;
    top: 300px;

    background-color: black;
    border: 2px solid black;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    gap: 1px;

  }

  .option-menu-deco{
    width: 1vw;
    height: 1vw;
    content: "";
    background: black;
    rotate: 45deg;

  }

  .option {
    width: 3vw;
    height: 3vw;
    background-color: white;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .option:hover {
    background-color: #a6a6a6;
    color: white;
  }
</style>
