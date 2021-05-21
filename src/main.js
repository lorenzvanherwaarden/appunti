import { createApp } from 'vue'
import { createStore } from 'vuex'
import activeNote from './store/activeNote'
import notes from './store/notes'
import App from './App.vue'

const store = createStore({
  modules: {
    activeNote,
    notes,
  }
})

createApp(App).use(store).mount('#app')
