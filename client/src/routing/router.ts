import PlayScreen from '@/Sudoku/components/screens/PlayScreen.vue'
import SplashScreen from '@/Sudoku/components/screens/SplashScreen.vue'
import GamePage from '@/components/GameCollection.vue'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router"
import GameWindow from "@/CrazyChicken/components/GameWindow.vue";

const routes: RouteRecordRaw[] = [
  { path: '/', component: GamePage },
  { path: '/Sudoku/play', component: PlayScreen },
  { path: '/Sudoku/splashscreen', component: SplashScreen },
  { path: '/CrazyChicken/GameWindow', component: GameWindow}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }
