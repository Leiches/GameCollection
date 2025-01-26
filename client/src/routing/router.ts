import PlayScreen from '@/Sudoku/components/screens/PlayScreen.vue'
import CrosswordGameScreen from '@/Crossword/components/screens/PlayScreen.vue'
import GameCollection from '@/components/GameCollection.vue'
import ViewportComponent from "@/Crazychicken/components/ViewportComponent.vue";
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  { path: '/', component: GameCollection },
  { path: '/Sudoku/play', component: PlayScreen },
  { path: '/Crossword/play', component: CrosswordGameScreen },
  { path: '/CrazyChicken', component: ViewportComponent}
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})

export { router }
