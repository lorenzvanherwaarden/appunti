import getUuidv4 from '../utils/getUuidv4'

const state = {
  guid: null,
}

const getters = {
  getActiveNote(state, _getters, _rootState, rootGetters) {
    return rootGetters.getNoteByGuid(state.guid)
  },

  getGuid(state) {
    return state.guid
  },

  getTitle(state, _getters, _rootState, rootGetters) {
    return rootGetters.getNoteByGuid(state.guid).title
  },

  getContent(_state, getters) {
    return getters.getActiveNote.content
  }
}

const mutations = {
  setGuid(state, guid) {
    state.guid = guid
  },
}

const actions = {
  createNewNote({ commit }) {
    commit('setGuid', getUuidv4())
  },

  setActiveNote({ commit }, note) {
    commit('setGuid', note.guid)
  },
}

export default {
  state,
  getters,
  mutations,
  actions,
}
