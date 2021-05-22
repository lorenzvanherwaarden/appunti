import getUuidv4 from '../utils/getUuidv4'

const state = {
  guid: null,
  title: '',
  content: '',
  sha: '',
}

const getters = {
  getGuid(state) {
    return state.guid
  },

  getTitle(state) {
    return state.title
  },

  getContent(state) {
    return state.content
  },

  getSha(state) {
    return state.sha
  }
}

const mutations = {
  setGuid(state, guid) {
    state.guid = guid
  },
  
  setTitle(state, title) {
    state.title = title
  },

  setContent(state, content) {
    state.content = content
  },

  setSha(state, sha) {
    state.sha = sha
  }
}

const actions = {
  createNewNote({ commit }) {
    commit('setGuid', getUuidv4())
    commit('setTitle', '')
    commit('setContent', '')
    commit('setSha', '')
  },

  setNote({ commit }, note) {
    commit('setGuid', note.guid)
    commit('setTitle', note.title)
    commit('setSha', note.sha)
    commit('setContent', note.content || '')
  },

  saveNote({ state, dispatch }) {
    dispatch('updateNote', state)
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
