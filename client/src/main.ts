import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { router } from './routing/router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)

/**
 * Mock data is configured using Mock Service Worker (https://mswjs.io/)
 * To enable mock data usage in the local dev environment, add the following line
 * to your .env.local file (create the file if you do not have one yet)
 * VITE_ENABLE_MOCKING=true
 */
if (import.meta.env.VITE_ENABLE_MOCKING) {
  const enableMocking = async () => {
    const { worker } = await import('./Sudoku/mocks/browser')
    return worker.start()
  }

  enableMocking().then(() => {
    app.mount('#app')
  })
} else {
  app.mount('#app')
}
