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

            if (file.size < 200) {
              dispatch('fetchContent', { file, username, repoName })
            }
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

  async fetchContent({ commit }, { file, username, repoName }) {
    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contents/${file.name}`, {
      headers: {
        Accept: 'application/vnd.github.VERSION.raw'
      }
    })

    commit('setContentForNote', { guid: file.name, content: response.data })
  },

  async saveNote({ rootGetters, commit }) {
    const note = rootGetters.getActiveNote
    const username = rootGetters.getUsername
    const repoName = rootGetters.getRepoName

    const message = `${note.title} updated on ${new Date()}`
    const content = btoa(note.content)

    const response = await axios.put(`https://api.github.com/repos/${username}/${repoName}/contents/${note.guid}`, {
      message,
      content,
      sha: note.sha,
    })

    commit('updateNote', {
      guid: note.guid,
      sha: response.data.sha
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

  setContentForNote(state, { guid, content }) {
    const noteIndex = state.notes.findIndex(note => note.guid === guid)
    
    state.notes.splice(noteIndex, 1, {
      ...state.notes[noteIndex],
      content,
    })
  },

  updateNote(state, { guid, data }) {
    const noteIndex = state.notes.findIndex(note => note.guid === guid)

    state.notes.splice(noteIndex, 1, {
      ...state.notes[noteIndex],
      ...data,
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
