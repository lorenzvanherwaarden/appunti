import getUuidv4 from '../utils/getUuidv4'

const state = {
  guid: null,
  title: '',
  content: '',
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
  }
}

const actions = {
  createNewNote({ commit }) {
    commit('setGuid', getUuidv4())
    commit('setTitle', '')
    commit('setContent', '')
  }
}

export default {
  state,
  getters,
  mutations,
  actions,
}
