import PlayScreen from '@/Sudoku/components/screens/PlayScreen.vue'
import SplashScreen from '@/Sudoku/components/screens/SplashScreen.vue'
import GameCollection from '@/components/GameCollection.vue'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: GameCollection },
  { path: '/Sudoku/play', component: PlayScreen },
  { path: '/Sudoku/splashscreen', component: SplashScreen },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export { router }
