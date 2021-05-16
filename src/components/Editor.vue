<template>
  <div class="editor">
    <textarea :value="note" @input="handleInput" class="editor__textarea" />
  </div>
</template>

<script>

export default {
  props: {
    note: String,
  },

  methods: {
    handleInput(event) {
      this.$emit('update:note', event.target.value)
    }
  }
}
</script>

<style scoped>
.editor {
  flex: 1;
  border-top: solid 1px var(--color-border);
}

.editor__textarea {
  outline: none;
  padding: var(--spacing-x-large);
  width: calc(100% - 2 * var(--spacing-x-large));
  height: calc(100% - 2 * var(--spacing-x-large));
  border: none;
  background: transparent;
  font-family: 'Source Code Pro', monospace;
  font-size: 1.6rem;
}
</style>