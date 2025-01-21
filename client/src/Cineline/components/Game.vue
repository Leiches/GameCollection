<script setup lang="ts">
    import Timeline from './Timeline.vue'
    import axios from 'axios';
    import { useMovieStore } from '@/Cineline/store/movies';
    import Movie from './Movie.vue';
    import { ref } from 'vue';

    interface Movie {
        adult: boolean;
        backdrop_path: string;
        genre_ids: number[];
        id: number;
        original_language: string;
        original_title: string;
        overview: string;
        popularity: number;
        poster_path: string;
        release_date: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
    }

    interface MovieList {
        page: number;
        results: Movie[];
        total_pages: number;
        total_results: number;
    }

    const roundCount = ref(1)
    const score = ref(0)

    const movieStore = useMovieStore()

    await axios.get('http://localhost:8080/CineLine')
    .then((data) => {
        console.log("data:");
        console.log(data);
        movieStore.movies = data.data
                            .flatMap((movies: MovieList) => movies.results
                            .map((movie: Movie) => ({
                                title: movie.title, 
                                year: new Date(movie.release_date).getFullYear(), 
                                poster_path: 'https://image.tmdb.org/t/p/w400/' + movie.poster_path
                            })))
                            .sort(() => Math.random() - 0.5)
                            .slice(0, 10);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });

    const selectYear = (year: number): void => {

        if (movieStore.movies) {
            if (roundCount.value < movieStore.movies?.length) {

                const diff = Math.abs(movieStore.movies[roundCount.value - 1].year - year);

                score.value -= diff
                roundCount.value += 1;
            }
        }
    }


</script>

<template>
    <h1>Round {{ roundCount }} of {{ movieStore.movies?.length }}</h1>
    <h1>Score: {{ score }}</h1>
    <Movie :movie="movieStore.movies ? movieStore.movies[roundCount - 1] : {title: 'unknown', poster_path: 'unknown', year: 2025}"/>
    <Timeline @selectYear="selectYear"/>
</template>

<style>

</style>