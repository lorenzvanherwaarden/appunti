import { createApp } from 'vue'
import { createStore } from 'vuex'
import note from './store/note'
import App from './App.vue'

const store = createStore({
  modules: {
    note,
  }
})

createApp(App).use(store).mount('#app')
