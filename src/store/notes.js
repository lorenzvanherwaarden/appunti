import axios from 'axios'
import isValidMarkdownFile from '../utils/isValidMarkdownFile'

const state = {
  notes: []
}

const getters = {
  getNotes(state) {
    return state.notes
  },

  getNoteByGuid(state) {
    return guid => {
      return state.notes.find(note => note.guid === guid)
    }
  }
} 

const actions = {
  async fetchNotes({ commit, dispatch }, { username, repoName }) {
    axios.get(`https://api.github.com/repos/${username}/${repoName}/contents`)
      .then(response => {
        commit('setNotes', [])
        
        response.data.forEach(file => {
          if (isValidMarkdownFile(file)) {
            commit('addNoteFromFile', file)
          }
        })
      })
      .catch(error => {
        console.error(error)

        if (error.response.status === 404) {
          // repository exists but is empty
          commit('setNotes', [])
        }
      })
  },
}

const mutations = {
  setNotes(state, notes) {
    state.notes = notes
  },

  addNoteFromFile(state, note) {
    const noteToAdd = {
      guid: note.name,
      title: note.name,
      sha: note.sha
    }

    const noteIndex = state.notes.findIndex(n => n.guid === noteToAdd.guid)
    if (noteIndex === -1) {
      state.notes.push(noteToAdd)
    } else {
      state.notes.splice(noteIndex, 1, noteToAdd)
    }
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
