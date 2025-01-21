<script setup lang="ts">

    interface Movie {
        title: string;
        poster_path: string;
        year: number;
    }

    defineProps<{
        movie: Movie
    }>()
</script>

<template>
    <div class="movie">
        <h1>{{ movie.title }}</h1>
        <img class="poster" :src="movie.poster_path" alt="Movie Poster">
    </div>

</template>

<style>

</style>