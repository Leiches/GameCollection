import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface Movie {
    title: string;
    poster_path: string;
    year: number;
}

export const useMovieStore = defineStore('movies', () => {
  const movies = ref<Movie[] | null>(null)

  return {
    movies
  }
})