import axios from 'axios'

const state = {
  notes: []
}

const getters = {
  getNotes(state) {
    return state.notes
  }
} 

const actions = {
  async fetchNotes({ rootGetters, commit, dispatch }) {
    const username = rootGetters.getUsername
    const repoName = rootGetters.getRepoName

    axios.get(`https://api.github.com/repos/${username}/${repoName}/contents`)
      .then(response => {
        response.data.forEach(file => {
          if (!file.path.includes('/')) {
            commit('addNoteFromFile', file)

            if (file.size < 200) {
              dispatch('fetchContent', file)
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

  async fetchContent({ commit, rootGetters }, file) {
    const username = rootGetters.getUsername
    const repoName = rootGetters.getRepoName

    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contents/${file.name}`, {
      headers: {
        Accept: 'application/vnd.github.VERSION.raw'
      }
    })

    commit('setContentForNote', { guid: file.name, content: response.data })
  },

  async updateNote({ rootGetters }, note) {
    const username = rootGetters.getUsername
    const repoName = rootGetters.getRepoName

    const message = `${note.title} updated on ${new Date()}`
    const content = btoa(note.content)

    const response = await axios.put(`https://api.github.com/repos/${username}/${repoName}/contents/${note.guid}`, {
      message,
      content,
      sha: note.sha,
    })
  }
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
