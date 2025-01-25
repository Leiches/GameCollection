import PlayScreen from '@/Sudoku/components/screens/PlayScreen.vue'
import SplashScreen from '@/Sudoku/components/screens/SplashScreen.vue'
import GamePage from '@/components/GameCollection.vue'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from "vue-router"
import ViewportComponent from "@/CrazyChicken/components/ViewportComponent.vue";

const routes: RouteRecordRaw[] = [
  { path: '/', component: GamePage },
  { path: '/Sudoku/play', component: PlayScreen },
  { path: '/Sudoku/splashscreen', component: SplashScreen },
  { path: '/CrazyChicken/ViewportComponent', component: ViewportComponent },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }
