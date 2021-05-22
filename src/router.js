import { createRouter, createWebHashHistory } from 'vue-router'
import Writer from './components/Writer.vue'
import Settings from './components/Settings.vue'

const routes = [
  {
    path: '/', component: Writer
  },
  {
    path: '/settings', name: 'settings', component: Settings
  }
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})