import axios from 'axios'
import getUuidv4 from '../utils/getUuidv4'

const state = {
  guid: null,
  title: null,
  content: null,
  sha: null,
  loaded: false,
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
    commit('setGuid', getUuidv4())
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

    const message = `${state.title} updated on ${new Date()}`
    const content = btoa(state.content)

    const response = await axios.put(`https://api.github.com/repos/${username}/${repoName}/contents/${state.guid}`, {
      message,
      content,
      sha: state.sha,
    })

    dispatch('updateSha', response.data.content.sha)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
