Simple score box
<script setup lang="ts">
defineProps({
  score: Number,
})
</script>

<template>
  <div id="score-box">
    <div id="deco-box">
      <p id="score">{{score}}</p>
    </div>
  </div>
</template>

<style scoped>
#score-box {
  width: 80px;
  height: 40px;
  background-color: #629a30;
  position: absolute;
  top: 0;
  right: 0;
  border-bottom-left-radius: 10px;
}

#deco-box {
  width: 60px;
  height: 30px;
  background-color: #8fc76d;
  position: relative;
  top: 5px;
  left: 10px;
  border-radius: 10px;
}

#score {
  width: 60px;
  height: 30px;
  text-align: center;
  padding-top: 3px;
  color: #000000;
  font-weight: bold;
}
</style>
