import axios from 'axios'
import getUuidv4 from '../utils/getUuidv4'

const state = {
  notes: [
    {
      guid: getUuidv4(),
      title: 'Tickets to create'
    },
    {
      guid: getUuidv4(),
      title: 'UI quick wins'
    },
    {
      guid: getUuidv4(),
      title: 'Recipe ideas'
    },
    {
      guid: getUuidv4(),
      title: 'Frontend interview questions examples'
    }
  ]
}

const getters = {
  getNotes(state) {
    return state.notes
  }
} 

const actions = {
  async fetchNotes({ rootGetters, commit }) {
    const username = rootGetters.getUsername
    const repoName = rootGetters.getRepoName

    axios.get(`https://api.github.com/repos/${username}/${repoName}/contents`)
      .then(response => {
        response.data.forEach(file => {
          if (!file.path.includes('/')) {
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
      size: note.size,
      url: note.download_url
    }

    state.notes.push(noteToAdd)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}