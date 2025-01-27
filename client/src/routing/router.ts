import PlayScreen from '@/Sudoku/components/screens/PlayScreen.vue'
import CrosswordGameScreen from '@/Crossword/components/screens/PlayScreen.vue'
import GameCollection from '@/components/GameCollection.vue'
import ViewportComponent from "@/Crazychicken/components/ViewportComponent.vue";
import PlayScreenCineLine from '@/Cineline/components/screens/PlayScreenCineLine.vue'
import SplashScreenCineLine from '@/Cineline/components/screens/SplashScreenCineline.vue'
import EndScreenCineLine from '@/Cineline/components/screens/EndScreenCineLine.vue'
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: GameCollection },
  { path: '/Sudoku/play', component: PlayScreen },
  { path: '/Crossword/play', component: CrosswordGameScreen },
  { path: '/CrazyChicken', component: ViewportComponent},
  { path: '/CineLine/play', component: PlayScreenCineLine},
  { path: '/CineLine/splashscreen', component: SplashScreenCineLine},
  { path: '/CineLine/endscreen', component: EndScreenCineLine},
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export { router }
