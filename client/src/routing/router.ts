import PlayScreen from '@/Sudoku/components/screens/PlayScreen.vue'
import SplashScreen from '@/Sudoku/components/screens/SplashScreen.vue'
import GamePage from '@/components/GameCollection.vue'
import App from '@/finalfortress/App.vue'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: GamePage },
  { path: '/Sudoku/play', component: PlayScreen },
  { path: '/Sudoku/splashscreen', component: SplashScreen },
  { path: '/finalfortress/App', component: App}
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export { router }
