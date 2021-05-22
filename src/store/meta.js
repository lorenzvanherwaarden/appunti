import axios from 'axios'

const state = {
  githubToken: window.localStorage.getItem('githubToken'),
  username: window.localStorage.getItem('username'),
  avatarUrl: window.localStorage.getItem('avatarUrl'),
  repoName: window.localStorage.getItem('repoName')
}

const getters = {
  getGithubToken(state) {
    return state.githubToken
  },

  getUsername(state) {
    return state.username
  },

  getAvatarUrl(state) {
    return state.avatarUrl
  },

  getRepoName(state) {
    return state.repoName
  }
}

const actions = {
  async setGithubToken({ commit, dispatch }, githubToken) {
    commit('setGithubToken', githubToken)
    await dispatch('setupToken')
    await dispatch('fetchUser')
  },

  async fetchUser({ commit }) {
    const response = await axios.get('https://api.github.com/user')
    commit('setUsername', response.data.login)
    commit('setAvatarUrl', response.data['avatar_url'])
  },

  setupToken({ state }) {
    if (state.githubToken) {
      axios.defaults.headers.common['Authorization'] = 'token ' + state.githubToken
    }
  },

  setupRepo({ state, commit, dispatch }, repoName) {
    commit('setRepoName', repoName)

    if (!state.githubToken || !state.repoName || !state.username) {
      return
    }

    dispatch('fetchNotes')
  }
}

const mutations = {
  setGithubToken(state, githubToken) {
    window.localStorage.setItem('githubToken', githubToken)
    state.githubToken = githubToken
  },

  setUsername(state, username) {
    window.localStorage.setItem('username', username)
    state.username = username
  },

  setAvatarUrl(state, avatarUrl) {
    window.localStorage.setItem('avatarUrl', avatarUrl)
    state.avatarUrl = avatarUrl
  },

  setRepoName(state, repoName) {
    window.localStorage.setItem('repoName', repoName)
    state.repoName = repoName
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}