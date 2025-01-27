<script setup lang="ts">
    interface Movie {
        title: string;
        poster_path: string;
        year: number;
    }

    defineProps<{
        movie: Movie
        showYear: boolean
    }>()
</script>

<template>
    <div class="movie-container">
        <h1>{{ movie.title }}</h1>
        <img class="movie-poster" :src="movie.poster_path" alt="Movie Poster">
        <h1>Release Year: {{ showYear ? movie.year : '????' }}</h1>
    </div>
</template>

<style>
    .movie-container {
        width: clamp(200px, 30%, 300px);
    }

    .movie-poster {
        width: 100%;
    }
</style>