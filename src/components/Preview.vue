<template>
  <div class="preview" v-html="parsedNote" />
</template>

<script>
import debounce from 'lodash/debounce'
import marked from 'marked'

export default {
  data() {
    return {
      parsedNote: '',
    }
  },

  computed: {
    note() {
      return this.$store.getters.getContent
    }
  },

  watch: {
    note() {
      this.parse()
    }
  },
  
  methods: {
    parse: debounce(function() {
      this.parsedNote = marked(this.note)
    }, 200)
  }
}
</script>

<style scoped>
.preview {
  flex: 2;
  padding: var(--spacing-small) var(--spacing-x-large) var(--spacing-x-large);
}
</style>
