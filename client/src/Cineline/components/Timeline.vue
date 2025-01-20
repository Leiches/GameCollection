<script setup lang="ts">
import axios from 'axios';
import { useMovieStore } from '@/Cineline/store/movies';

const movieStore = useMovieStore()

await axios.get('http://localhost:8080/CineLine')
    .then((data) => {
        console.log("data:");
        console.log(data);
        movieStore.movies = data.data.flatMap(movies => movies.results);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
</script>

<template>
    <div class="timeline"
    ></div>
</template>

<style scoped>

</style>