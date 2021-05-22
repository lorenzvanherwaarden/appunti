<template>
  <div class="library">
    <h1 class="library__app-name u-user-select-none">Appunti</h1>
    <div class="library__folders">
      <h4 class="library__category u-user-select-none">
        {{ repoName || 'notes' }}
      </h4>
      <div 
        :key="note.guid" 
        v-for="note in notes"
        v-text="note.title"
        class="library__item u-user-select-none" 
        :class="{'library__item--active': note.guid === activeNoteGuid}"
        @click="setNote(note)"
      />
    </div>
    <UserInfo />
    <button v-if="!githubToken" @click="configureGithub">
      Configure Github
    </button>
    <div class="u-mt-x-small">
      <button @click="handleNewNote" class="library__new-note">
        New note
      </button>
    </div>
  </div>
</template>

<script setup>
import UserInfo from './UserInfo.vue'
</script>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      notes: 'getNotes', 
      activeNoteGuid: 'getGuid', 
      githubToken: 'getGithubToken',
      repoName: 'getRepoName',
    })
  },

  methods: {
    handleNewNote() {
      this.$store.dispatch('createNewNote')
    },

    setNote(note) {
      this.$store.dispatch('setActiveNote', note)
    },

    configureGithub() {
      this.$router.push('settings')
    }
  }
}
</script>

<style scoped>
.library {
  display: flex;
  flex-direction: column;
  min-width: 32rem;
  max-width: 32rem;
  background-color: var(--color-background-accent);
  padding: var(--spacing-large);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-right: solid 1px var(--color-border);
}

.library__app-name {
  margin-top: 0;
  font-weight: 700;
  color: var(--color-accent);
}

.library__folders {
  flex: 1;
}

.library__category {
  text-transform: uppercase;
  font-weight: 500;
  color: var(--color-text-muted);
  margin-bottom: var(--spacing-small);
}

.library__item {
  padding: var(--spacing-small);
  border-radius: var(--radius-default);
  font-weight: 500;
}

.library__item:hover {
  background-color: rgba(var(--rgb-accent), 0.2);
}

.library__item--active {
  background-color: rgba(var(--rgb-accent), 0.3);
}

.library__new-note {
  width: 100%;
}
</style>