import SudokuPlayScreen from '@/Sudoku/components/screens/PlayScreen.vue'
import CrosswordGameScreen from '@/Crossword/components/screens/PlayScreen.vue'
import GameCollection from '@/components/GameCollection.vue'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: GameCollection },
  { path: '/Sudoku/play', component: SudokuPlayScreen },
  { path: '/Crossword/play', component: CrosswordGameScreen },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export { router }
