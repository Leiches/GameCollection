<script setup lang="ts">
import axios from 'axios';



await axios.get('http://localhost:8080/Crossword')
  .then((data) => {
    console.log("data:");
    console.log(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });


</script>

<template>
  <div class="board">

  </div>
</template>

<style scoped>

</style>
