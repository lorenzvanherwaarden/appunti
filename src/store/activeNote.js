import axios from 'axios'
import convertDashCaseToTitle from '../utils/convertDashCaseToTitle'
import convertToDashCase from '../utils/convertToDashCase'

const state = {
  guid: null,
  title: null,
  content: null,
  sha: null,
  loaded: true,
}

const getters = {
  getActiveNote(state) {
    return state
  },

  getGuid(state) {
    return state.guid
  },

  getTitle(state) {
    return state.title
  },

  getSha(state) {
    return state.sha
  },

  getContent(state) {
    return state.content
  },

  getLoaded(state) {
    return state.loaded
  }
}

const mutations = {
  setGuid(state, guid) {
    state.guid = guid
  },

  setTitle(state, title) {
    state.title = title
  },

  setSha(state, sha) {
    state.sha = sha
  },

  setContent(state, content) {
    state.content = content
  },

  setLoaded(state, loaded) {
    state.loaded = loaded
  }
}

const actions = {
  createNewNote({ commit }) {
    commit('setGuid', 'create')
  },

  setActiveNote({ commit, dispatch, rootGetters }, note) {
    commit('setLoaded', false)
    commit('setGuid', note.guid)
    commit('setTitle', note.title)
    commit('setSha', note.sha)

    dispatch('fetchContent', {
      guid: note.guid,
      username: rootGetters.getUsername,
      repoName: rootGetters.getRepoName
    })
  },

  updateSha({ commit }, sha) {
    commit('setSha', sha)
    // todo: set sha of note in notes
  },

  updateTitle({ commit }, title) {
    commit('setTitle', title)
    // todo: set title of note in notes
  },

  async fetchContent({ commit }, { guid, username, repoName }) {
    commit('setLoaded', false)

    const response = await axios.get(`https://api.github.com/repos/${username}/${repoName}/contents/${guid}`, {
      headers: {
        Accept: 'application/vnd.github.VERSION.raw'
      }
    })

    commit('setContent', response.data)
    commit('setLoaded', true)
  },

  async saveNote({ state, dispatch, rootGetters }) {
    const username = rootGetters.getUsername
    const repoName = rootGetters.getRepoName

    const content = btoa(state.content)

    if (state.guid === 'create') {
      const message = `${state.title} created on ${new Date()}`
      const guid = convertToDashCase(state.title)

      await axios.put(`https://api.github.com/repos/${username}/${repoName}/contents/${guid}`, {
        message,
        content,
      })

      dispatch('fetchNotes', { username, repoName })
    } else {
      const message = `${state.title} updated on ${new Date()}`

      // TODO: support updated title -> guid conversion

      const response = await axios.put(`https://api.github.com/repos/${username}/${repoName}/contents/${state.guid}`, {
        message,
        content,
        sha: state.sha,
      })

      dispatch('updateSha', response.data.content.sha)
    }
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
