import { createStore } from 'vuex'
import activeNote from './activeNote'
import notes from './notes'
import meta from './meta'
import repositories from './repositories'

export default createStore({
  modules: {
    meta,
    notes,
    activeNote,
    repositories
  }
})
