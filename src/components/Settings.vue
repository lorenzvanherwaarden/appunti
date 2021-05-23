<template>
  <div class="github-settings-container">
    <BackButton />
    <h2 class="u-mt-none">
      Settings
    </h2>
    <label>
      Github token
    </label>
    <input v-model="token" type="password" @paste="saveToken($event)" class="form-control" />
    <label>
      Repository
    </label>
    <select v-if="token && repos" v-model="name" class="form-control">
      <option :key="repo" v-for="repo in repos" :value="repo">
        {{ repo }}
      </option>
    </select>
    <button class="u-mt-x-large" @click="save">
      Save
    </button>
  </div>
</template>

<script setup>
import BackButton from './BackButton.vue'
</script>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      token: this.$store.getters.getGithubToken,
      name: this.$store.getters.getRepoName,
    }
  },

  created() {
    this.$store.dispatch('fetchRepos')
  },

  computed: {
    ...mapGetters({
      repos: 'getRepos'
    })
  },

  methods: {
    async saveToken(event) {
      await this.$store.dispatch('setGithubToken', event.clipboardData.getData('text/plain'))
      this.$store.dispatch('fetchRepos')
    },

    async save() {
      await this.$store.dispatch('setGithubToken', this.token)
      this.$store.dispatch('setupRepo', this.name)
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.github-settings-container {
  width: 100%;
  max-width: 450px;
  margin: var(--spacing-x-large);
}
</style>
