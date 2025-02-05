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
    const score = ref(1000)
    const showYear = ref(false)
    const showButton = ref(false)

    const movieStore = useMovieStore()

    const emit = defineEmits(['endGame']);

    // fetches the 100 movies withe highest overall ratings from the api, shuffles their order and stores the first 10 of them
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

    // moves on to the next round/movie
    const nextMovie = (): void => {

        if (movieStore.movies) {
            // if not all 10 movies/round are finished, the game continues
            if (roundCount.value < movieStore.movies?.length) {

                roundCount.value += 1;
                showYear.value = false;

                showButton.value = false;
            }
            // if the last round is finished, the game ends
            else {
                emit('endGame', score.value);
            }
        }
    }

    // updates the score
    const updateScore = (yearGuess: number) => {

        if (movieStore.movies) {

            showYear.value = true;

            const duration = 2000;
            const startTimestamp = performance.now();
            const diff = Math.abs(movieStore.movies[roundCount.value - 1].year - yearGuess);
            const startScore = score.value;
            const endScore = score.value - diff;
            
            // update animation
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
    <div class="game-info">    
        <h1>Movie {{ roundCount }} of {{ movieStore.movies?.length }}</h1>
        <h1>Score: {{ score }}</h1>
        <button class="green" v-show="showButton" @click="nextMovie" >Next Movie</button>
    </div>
    <Movie :showYear="showYear" :movie="movieStore.movies ? movieStore.movies[roundCount - 1] : {title: 'unknown', poster_path: 'unknown', year: 2025}"/>
    <Timeline @selectYear="updateScore" :currentRound="roundCount" :correctYear="movieStore.movies ? movieStore.movies[roundCount - 1].year : 2025"/>
</template>

<style>
    .game-info {
        position: absolute;
        top: 20px;
        left: 20px;
    }

    button {
        border: none;
        padding: 0 !important;
        background-color: transparent;
    }

    button:hover {
        cursor: pointer;
    }
</style>