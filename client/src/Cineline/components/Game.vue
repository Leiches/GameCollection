<script setup lang="ts">
    import Timeline from './Timeline.vue'
    import axios from 'axios';
    import { useMovieStore } from '@/Cineline/store/movies';
    import Movie from './Movie.vue';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

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

    const router = useRouter()

    const roundCount = ref(1)
    const score = ref(0)
    const showYear = ref(false)
    const showButton = ref(false)

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

    const nextMovie = (): void => {

        if (movieStore.movies) {
            if (roundCount.value < movieStore.movies?.length) {

                roundCount.value += 1;
                showYear.value = false;

                showButton.value = false;
            }
            else {
                router.push('/CineLine/endscreen')
            }
        }
    }

    const updateScore = (yearGuess: number) => {

        if (movieStore.movies) {

            showYear.value = true;

            const duration = 2000;
            const startTimestamp = performance.now();
            const diff = Math.abs(movieStore.movies[roundCount.value - 1].year - yearGuess);
            const startScore = score.value;
            const endScore = score.value - diff;
            
            const step = (timestamp: number) => {
                const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                score.value = Math.round(startScore + (endScore - startScore) * progress);
                
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    score.value = endScore;
                    showButton.value = true;
                }
            };
            
            requestAnimationFrame(step);
        }
    };


</script>

<template>
    <div class="cineline-container">
        <div class="game-info">    
            <h1>Movie {{ roundCount }} of {{ movieStore.movies?.length }}</h1>
            <h1>Score: {{ score }}</h1>
            <button v-show="showButton" @click="nextMovie" >Next Movie</button>
        </div>
        <Movie :showYear="showYear" :movie="movieStore.movies ? movieStore.movies[roundCount - 1] : {title: 'unknown', poster_path: 'unknown', year: 2025}"/>
        <Timeline @selectYear="updateScore" :correctYear="movieStore.movies ? movieStore.movies[roundCount - 1].year : 2025"/>
    </div>
</template>

<style>
    .cineline-container {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .game-info {
        position: absolute;
        top: 0;
        left: 0;
    }
</style>