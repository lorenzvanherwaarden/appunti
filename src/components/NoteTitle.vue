<template>
  <div class="note-title">
    <input 
      type="text" 
      :value="title" 
      placeholder="Untitled note"
      @input="updateTitle" 
      class="note-title__title-input" 
    />
  </div>
</template>

<script>
export default {
  computed: {
    title() {
      return this.$store.getters.getTitle
    }
  },

  methods: {
    updateTitle(event) {
      this.$store.commit('setTitle', event.target.value)
    },
  },
}
</script>

<style scoped>
.note-title {
  width: 100%;
  padding: var(--spacing-large) var(--spacing-x-large) var(--spacing-x-small) ;
}

.note-title__title-input {
  appearance: none;
  border: none;
  background-color: transparent;
  width: 100%;
  padding: var(--spacing-small) 0;
  font-size: 3.0rem;
  font-weight: 700;
  outline: none;
  color: var(--color-text);
}
</style>
