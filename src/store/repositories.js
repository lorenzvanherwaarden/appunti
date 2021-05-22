import axios from 'axios'

const state = {
  repos: []
}

const getters = {
  getRepos(state) {
    return state.repos
  }
}

const actions = {
  async fetchRepos({ rootGetters, commit }) {
    if (!rootGetters.getGithubToken) {
      return
    }

    const response = await axios.get('https://api.github.com/user/repos')
    commit('setRepos', response.data.map(repo => repo.name))
  }
}

const mutations = {
  setRepos(state, repos) {
    state.repos = repos
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}