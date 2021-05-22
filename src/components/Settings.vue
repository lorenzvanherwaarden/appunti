<template>
  <div class="github-settings-container">
    <h2>
      Settings
    </h2>
    <label>
      Github token
    </label>
    <input v-model="token" type="text" class="input--mono" />
    <label>
      Repository name
    </label>
    <input v-model="name" type="text" />
    <button class="u-mt-x-large" @click="save">
      Save
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      token: this.$store.getters.getGithubToken,
      name: this.$store.getters.getRepoName,
    }
  },

  methods: {
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
  padding: var(--spacing-x-large);
}
</style>
